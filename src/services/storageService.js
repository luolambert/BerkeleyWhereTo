import buildingImages from "../data/buildingImages.json";

const IMAGES_BASE_PATH = "/images/buildings";

export function getImageUrl(buildingId, filename = "1.jpg") {
  return `${IMAGES_BASE_PATH}/${buildingId}/${filename}`;
}

export function getImageUrls(buildingId, count = 1) {
  const files = buildingImages[buildingId] || [];
  const actualCount = Math.min(count, files.length || 1);
  return Array.from({ length: actualCount }, (_, i) =>
    getImageUrl(buildingId, files[i] || `${i + 1}.jpg`)
  );
}

export function listBuildingImages(buildingId) {
  const files = buildingImages[buildingId] || ["1.jpg"];
  return files.map((filename) => getImageUrl(buildingId, filename));
}

export async function uploadImage(buildingId, file, filename) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("buildingId", buildingId);
  formData.append("filename", filename);
  
  console.warn("[StorageService] Local upload not implemented - requires backend API");
  return null;
}

export async function deleteImage(buildingId, filename) {
  console.warn("[StorageService] Local delete not implemented - requires backend API");
  return { success: false, error: "Not implemented" };
}
