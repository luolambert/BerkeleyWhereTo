import { supabase } from "./supabaseClient";

const BUCKET_NAME = "building-images";

export function getImageUrl(buildingId, filename = "1.jpg") {
  if (!supabase) {
    console.warn("[StorageService] Supabase client not initialized");
    return null;
  }
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(`${buildingId}/${filename}`);
  return data.publicUrl;
}

export function getImageUrls(buildingId, count = 1) {
  if (!supabase) return [];
  return Array.from({ length: count }, (_, i) =>
    getImageUrl(buildingId, `${i + 1}.jpg`)
  ).filter(Boolean);
}

export async function listBuildingImages(buildingId) {
  if (!supabase) return [];
  
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(buildingId, { limit: 100, sortBy: { column: "name", order: "asc" } });

  if (error) {
    console.error(`Failed to list images for ${buildingId}:`, error);
    return [];
  }

  return data
    .filter((file) => file.name.match(/\.(jpg|jpeg|png|webp)$/i))
    .map((file) => getImageUrl(buildingId, file.name));
}

export async function uploadImage(buildingId, file, filename) {
  if (!supabase) return null;
  
  const path = `${buildingId}/${filename}`;
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, { upsert: true });

  if (error) {
    console.error(`Failed to upload ${path}:`, error);
    return null;
  }

  return getImageUrl(buildingId, filename);
}

