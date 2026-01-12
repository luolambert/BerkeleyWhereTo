import React, { useState, useEffect, useMemo } from "react";
import { advancedBuildings } from "../../data";
import { listBuildingImages } from "../../services/storageService";

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const ImageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
  </svg>
);

export default function BuildingList({ onSelectBuilding }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [imageFilter, setImageFilter] = useState("all");
  const [imageCounts, setImageCounts] = useState({});
  const [thumbnails, setThumbnails] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImageData = async () => {
      setIsLoading(true);
      const counts = {};
      const thumbs = {};
      
      await Promise.all(
        advancedBuildings.map(async (building) => {
          const images = await listBuildingImages(building.id);
          counts[building.id] = images.length;
          thumbs[building.id] = images.slice(0, 4);
        })
      );
      
      setImageCounts(counts);
      setThumbnails(thumbs);
      setIsLoading(false);
    };

    loadImageData();
  }, []);

  const stats = useMemo(() => {
    const withImages = Object.values(imageCounts).filter((c) => c > 0).length;
    const withoutImages = advancedBuildings.length - withImages;
    return { withImages, withoutImages };
  }, [imageCounts]);

  const filteredBuildings = useMemo(() => {
    let result = advancedBuildings;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.id.toLowerCase().includes(query) ||
          b.category?.toLowerCase().includes(query)
      );
    }
    
    if (imageFilter === "with" && !isLoading) {
      result = result.filter((b) => (imageCounts[b.id] || 0) > 0);
    } else if (imageFilter === "without" && !isLoading) {
      result = result.filter((b) => (imageCounts[b.id] || 0) === 0);
    }
    
    return result;
  }, [searchQuery, imageFilter, imageCounts, isLoading]);

  return (
    <>
      <div className="search-container">
        <div className="search-wrapper">
          <span className="search-icon">
            <SearchIcon />
          </span>
          <input
            type="text"
            className="search-input"
            placeholder="Search buildings by name, ID, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <button
            className={`filter-btn ${imageFilter === "all" ? "active" : ""}`}
            onClick={() => setImageFilter("all")}
          >
            All ({advancedBuildings.length})
          </button>
          <button
            className={`filter-btn ${imageFilter === "with" ? "active" : ""}`}
            onClick={() => setImageFilter("with")}
          >
            With Images ({stats.withImages})
          </button>
          <button
            className={`filter-btn ${imageFilter === "without" ? "active" : ""}`}
            onClick={() => setImageFilter("without")}
          >
            No Images ({stats.withoutImages})
          </button>
        </div>
        
        <span style={{ marginLeft: "1rem", color: "#64748b", fontSize: "0.875rem" }}>
          {filteredBuildings.length} buildings
        </span>
      </div>

      <div className="building-grid">
        {filteredBuildings.map((building) => (
          <div
            key={building.id}
            className="building-card"
            onClick={() => onSelectBuilding(building)}
          >
            <div className="building-card-header">
              <div>
                <div className="building-name">{building.name}</div>
                <div className="building-id">{building.id}</div>
              </div>
              <div className="image-count">
                <ImageIcon />
                <span className="image-count-badge">
                  {imageCounts[building.id] ?? "..."}
                </span>
              </div>
            </div>
            
            {thumbnails[building.id]?.length > 0 ? (
              <div className="thumbnail-grid">
                {thumbnails[building.id].map((url, idx) => (
                  <img
                    key={idx}
                    src={url}
                    alt=""
                    className="thumbnail"
                    loading="lazy"
                  />
                ))}
                {Array.from({ length: Math.max(0, 4 - thumbnails[building.id].length) }).map((_, idx) => (
                  <div key={`placeholder-${idx}`} className="thumbnail-placeholder">
                    <ImageIcon />
                  </div>
                ))}
              </div>
            ) : (
              <div className="thumbnail-grid">
                {[...Array(4)].map((_, idx) => (
                  <div key={idx} className="thumbnail-placeholder">
                    <ImageIcon />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
