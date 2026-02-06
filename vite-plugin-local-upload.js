import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, 'public', 'images', 'buildings');
const CONFIG_PATH = path.join(__dirname, 'src', 'data', 'buildingImages.json');

const VALID_BUILDING_ID = /^[a-z0-9_]+$/i;
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const SAFE_FILENAME = /^[a-z0-9][a-z0-9._-]*\.(jpg|jpeg|png|webp)$/i;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

function sanitizeFilename(filename) {
  const safeName = path.basename(filename || '');
  if (safeName !== filename) return null;
  if (!SAFE_FILENAME.test(safeName)) return null;
  const ext = path.extname(safeName).toLowerCase();
  if (!VALID_EXTENSIONS.includes(ext)) return null;
  return safeName;
}

async function readConfig() {
  try {
    const content = await fs.readFile(CONFIG_PATH, 'utf-8');
    return JSON.parse(content);
  } catch {
    return {};
  }
}

async function writeConfig(config) {
  const sorted = Object.keys(config).sort().reduce((acc, key) => {
    acc[key] = config[key].sort();
    return acc;
  }, {});
  await fs.writeFile(CONFIG_PATH, JSON.stringify(sorted, null, 2), 'utf-8');
}

export default function localUploadPlugin() {
  return {
    name: 'local-upload-api',
    configureServer(server) {
      server.middlewares.use('/api/images', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const buildingId = url.searchParams.get('buildingId');

        if (!buildingId || !VALID_BUILDING_ID.test(buildingId)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid buildingId' }));
          return;
        }

        const config = await readConfig();
        const images = config[buildingId] || [];
        
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ images }));
      });

      server.middlewares.use('/api/upload', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const formidable = (await import('formidable')).default;
          const form = formidable({
            multiples: false,
            allowEmptyFiles: false,
            maxFileSize: MAX_FILE_SIZE_BYTES,
          });

          const [fields, files] = await form.parse(req);
          const buildingId = fields.buildingId?.[0];
          const filename = fields.filename?.[0];
          const file = files.file?.[0];

          if (!buildingId || !VALID_BUILDING_ID.test(buildingId)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid buildingId' }));
            return;
          }

          if (!filename || !file) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Missing file or filename' }));
            return;
          }

          const safeFilename = sanitizeFilename(filename);
          if (!safeFilename) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid filename or file type' }));
            return;
          }

          const buildingDir = path.join(IMAGES_DIR, buildingId);
          await fs.mkdir(buildingDir, { recursive: true });

          const destPath = path.join(buildingDir, safeFilename);
          await fs.copyFile(file.filepath, destPath);

          const config = await readConfig();
          if (!config[buildingId]) {
            config[buildingId] = [];
          }
          if (!config[buildingId].includes(safeFilename)) {
            config[buildingId].push(safeFilename);
          }
          await writeConfig(config);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ 
            success: true, 
            url: `/images/buildings/${buildingId}/${safeFilename}`,
            images: config[buildingId]
          }));
        } catch (err) {
          console.error('[Upload Error]', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      server.middlewares.use('/api/delete', async (req, res) => {
        if (req.method !== 'DELETE') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const url = new URL(req.url, `http://${req.headers.host}`);
        const buildingId = url.searchParams.get('buildingId');
        const filename = url.searchParams.get('filename');

        if (!buildingId || !VALID_BUILDING_ID.test(buildingId)) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Invalid buildingId' }));
          return;
        }

        if (!filename) {
          res.statusCode = 400;
          res.end(JSON.stringify({ error: 'Missing filename' }));
          return;
        }

        try {
          const safeFilename = sanitizeFilename(filename);
          if (!safeFilename) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid filename' }));
            return;
          }

          const filePath = path.join(IMAGES_DIR, buildingId, safeFilename);
          await fs.unlink(filePath);

          const config = await readConfig();
          if (config[buildingId]) {
            config[buildingId] = config[buildingId].filter(f => f !== safeFilename);
            if (config[buildingId].length === 0) {
              delete config[buildingId];
            }
          }
          await writeConfig(config);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ 
            success: true,
            images: config[buildingId] || []
          }));
        } catch (err) {
          console.error('[Delete Error]', err);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    }
  };
}
