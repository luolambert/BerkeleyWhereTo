import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = path.join(__dirname, 'public', 'images', 'buildings');
const CONFIG_PATH = path.join(__dirname, 'src', 'data', 'buildingImages.json');

const VALID_BUILDING_ID = /^[a-z0-9_]+$/i;
const VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

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
          const form = formidable({ multiples: false });

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

          const ext = path.extname(filename).toLowerCase();
          if (!VALID_EXTENSIONS.includes(ext)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid file type' }));
            return;
          }

          const buildingDir = path.join(IMAGES_DIR, buildingId);
          await fs.mkdir(buildingDir, { recursive: true });

          const destPath = path.join(buildingDir, filename);
          const fileContent = await fs.readFile(file.filepath);
          await fs.writeFile(destPath, fileContent);

          const config = await readConfig();
          if (!config[buildingId]) {
            config[buildingId] = [];
          }
          if (!config[buildingId].includes(filename)) {
            config[buildingId].push(filename);
          }
          await writeConfig(config);

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ 
            success: true, 
            url: `/images/buildings/${buildingId}/${filename}`,
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
          const filePath = path.join(IMAGES_DIR, buildingId, filename);
          await fs.unlink(filePath);

          const config = await readConfig();
          if (config[buildingId]) {
            config[buildingId] = config[buildingId].filter(f => f !== filename);
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
