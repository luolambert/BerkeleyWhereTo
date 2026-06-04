import buildingImages from "../data/buildingImages.json";

const IMAGES_BASE_PATH = "/images/buildings";

export function getImageUrl(buildingId, filename = "1.jpg") {
  return `${IMAGES_BASE_PATH}/${buildingId}/${filename}`;
}

export function getImageUrls(buildingId, filenames = []) {
  if (filenames.length === 0) return [getImageUrl(buildingId, "1.jpg")];
  return filenames.map((filename) => getImageUrl(buildingId, filename));
}

export async function listBuildingImages(buildingId) {
  if (import.meta.env.DEV) {
    try {
      const response = await fetch(`/api/images?buildingId=${buildingId}`);
      if (response.ok) {
        const data = await response.json();
        return (data.images || []).map((filename) => getImageUrl(buildingId, filename));
      }
    } catch {
      console.warn("[StorageService] API not available, using static config");
    }
  }

  const files = buildingImages[buildingId] || [];
  return files.map((filename) => getImageUrl(buildingId, filename));
}

export async function uploadImage(buildingId, file, filename) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("buildingId", buildingId);
  formData.append("filename", filename);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("[StorageService] Upload failed:", error);
      return null;
    }

    const data = await response.json();
    return data.url;
  } catch (e) {
    console.error("[StorageService] Upload error:", e);
    return null;
  }
}

export async function deleteImage(buildingId, filename) {
  try {
    const response = await fetch(
      `/api/delete?buildingId=${buildingId}&filename=${encodeURIComponent(filename)}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.error };
    }

    return { success: true };
  } catch (e) {
    console.error("[StorageService] Delete error:", e);
    return { success: false, error: e.message };
  }
}
