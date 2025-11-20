# Berkeley Where-To-Go - Walkthrough

## Overview

**Berkeley Where-To-Go** is a web application designed to help UC Berkeley students, especially freshmen, plan their commute between campus buildings. It calculates walking and scooter travel times to aid in course scheduling and avoiding "Berkeley Time" lateness.

## Features

- **Interactive Map**: Visualizes the campus and routes using Google Maps.
- **Building Selector**: Autocomplete search for popular campus buildings (Dwinelle, Wheeler, etc.).
- **Travel Time Calculation**: Estimates time for:
  - 🚶 Walking
  - 🛴 Scooter / Bike
- **Elevation Profile**: Displays an elevation chart showing the climb and descent of your route.
- **Slope Visualization**: The route line changes color based on steepness (Green: Flat, Yellow: Moderate, Red: Steep).
- **Berkeley Branding**: Designed with the official Blue & Gold color palette.
- **Responsive Design**: Works on desktop and mobile devices.

## Setup Instructions

### Prerequisites

- Node.js installed.
- A Google Maps API Key with "Maps JavaScript API", "Places API", "Distance Matrix API", and "Elevation API" enabled.

### Installation

1.  Navigate to the project directory:
    ```bash
    cd "Berkeley Where-To-Go"
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure API Key:
    - Open `.env` file.
    - Replace `YOUR_API_KEY_HERE` with your actual Google Maps API Key.
    ```env
    VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
    ```

### Running the App

Start the development server:

```bash
npm run dev
```

Open your browser to the URL shown (usually `http://localhost:5173`).

## Usage Guide

1.  **Enter Start Location**: Type the name of your starting building (e.g., "Dwinelle Hall"). Select from the dropdown.
2.  **Enter End Location**: Type the name of your destination (e.g., "Wheeler Hall"). Select from the dropdown.
3.  **Calculate**: Click the "Calculate Time" button.
4.  **View Results**:
    - The estimated time for walking and scooting will appear below.
    - **Elevation Chart**: A chart at the bottom of the sidebar shows the terrain profile.
    - **Map**: The route line is colored to indicate slope. A legend on the map explains the colors.

## Verification Results

- **Build**: Passed (`npm run build`).
- **Linting**: Passed.
- **UI Components**: Implemented and styled.
- **Logic**: Real API integration for Distance, Directions, and Elevation.
