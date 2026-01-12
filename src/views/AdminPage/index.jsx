import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import BuildingList from "./BuildingList";
import ImageManager from "./ImageManager";
import "./AdminPage.css";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const BookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

function AdminPage() {
  const navigate = useNavigate();
  const { user, loading, isAdmin, signInWithGoogle, signOut } = useAuth();
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  if (loading) {
    return (
      <div className="admin-page login-container">
        <span className="loading-spinner" style={{ width: "2rem", height: "2rem" }} />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-page login-container">
        <div className="login-card">
          <h1 className="login-title">Admin Login</h1>
          <p className="login-subtitle">
            Sign in with your Google account to manage building images
          </p>
          <button className="btn btn-google" onClick={signInWithGoogle}>
            <GoogleIcon />
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-page login-container">
        <div className="login-card">
          <h1 className="login-title">Access Denied</h1>
          <p className="login-subtitle">
            Logged in as: {user.email}
          </p>
          <div className="access-denied">
            <p className="access-denied-text">
              You don't have permission to access the admin panel.
            </p>
          </div>
          <button
            className="btn btn-secondary"
            style={{ marginTop: "1.5rem" }}
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        <header className="admin-header">
          <h1 className="admin-title">
            <span className="admin-title-icon">
              <SettingsIcon />
            </span>
            Image Manager
          </h1>
          <div className="user-info">
            <button className="btn btn-secondary" onClick={() => navigate("/know")}>
              <BookIcon />
              Know
            </button>
            <span className="user-email">{user.email}</span>
            <button className="btn btn-secondary" onClick={signOut}>
              Sign out
            </button>
          </div>
        </header>

        {selectedBuilding ? (
          <ImageManager
            building={selectedBuilding}
            onBack={() => setSelectedBuilding(null)}
          />
        ) : (
          <BuildingList onSelectBuilding={setSelectedBuilding} />
        )}
      </div>
    </div>
  );
}

export default AdminPage;
