import React, { useState, useEffect, useCallback } from "react";
import imageCompression from "browser-image-compression";
import {
  listBuildingImages,
  uploadImage,
  deleteImage,
  getImageUrl,
} from "../../services/storageService";

const COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  useWebWorker: true,
  preserveExif: true,
  fileType: "image/jpeg",
};

async function compressImage(file) {
  try {
    const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
    return compressedFile;
  } catch (error) {
    console.error("Compression failed, using original:", error);
    return file;
  }
}


const UploadIcon = () => (
  <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17,8 12,3 7,8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const BackIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);

export default function ImageManager({ building, onBack }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const loadImages = useCallback(async () => {
    setLoading(true);
    const urls = await listBuildingImages(building.id);
    setImages(
      urls.map((url) => ({
        url,
        filename: url.split("/").pop().split("?")[0],
      }))
    );
    setLoading(false);
  }, [building.id]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const handleUpload = async (files) => {
    if (!files.length) return;
    
    setUploading(true);
    
    const currentImages = await listBuildingImages(building.id);
    const existingNumbers = currentImages
      .map((url) => {
        const filename = url.split("/").pop().split("?")[0];
        return parseInt(filename.split(".")[0], 10);
      })
      .filter((n) => !isNaN(n));
    
    let nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const ext = file.name.split(".").pop().toLowerCase();
      if (!["jpg", "jpeg", "png", "webp"].includes(ext)) continue;
      
      setUploadProgress(`Compressing ${i + 1}/${files.length}...`);
      const compressedBlob = await compressImage(file);
      
      const filename = `${nextNumber}.jpg`;
      setUploadProgress(`Uploading ${i + 1}/${files.length}...`);
      await uploadImage(building.id, compressedBlob, filename);
      
      nextNumber++;
    }
    
    setUploadProgress("");
    await loadImages();
    setUploading(false);
  };

  const handleDelete = async (filename) => {
    if (!confirm(`Delete ${filename}?`)) return;
    
    await deleteImage(building.id, filename);
    await loadImages();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleUpload(Array.from(e.dataTransfer.files));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  return (
    <div className="image-manager">
      <div className="manager-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button className="btn btn-secondary" onClick={onBack}>
            <BackIcon />
            Back
          </button>
          <div>
            <div className="manager-title">{building.name}</div>
            <div style={{ color: "#64748b", fontSize: "0.875rem" }}>
              {building.id} · {images.length} images
            </div>
          </div>
        </div>
      </div>

      <div
        className={`upload-zone ${dragOver ? "drag-over" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => document.getElementById("file-input").click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={(e) => handleUpload(Array.from(e.target.files))}
        />
        {uploading ? (
          <>
            <span className="loading-spinner" />
            <div className="upload-text" style={{ marginTop: "1rem" }}>
              {uploadProgress || "Processing..."}
            </div>
            <div className="upload-hint">
              Auto-compressing to optimize file size
            </div>
          </>
        ) : (
          <>
            <UploadIcon />
            <div className="upload-text">
              Drop images here or click to upload
            </div>
            <div className="upload-hint">
              Supports JPG, PNG, WebP
            </div>
          </>
        )}
      </div>

      {loading ? (
        <div className="empty-state">
          <span className="loading-spinner" />
        </div>
      ) : images.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>
          <div>No images uploaded yet</div>
        </div>
      ) : (
        <div className="image-grid">
          {images.map((img) => (
            <div key={img.filename} className="image-item">
              <img src={img.url} alt={img.filename} />
              <div className="image-overlay">
                <span className="image-filename">{img.filename}</span>
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(img.filename);
                  }}
                >
                  <TrashIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
