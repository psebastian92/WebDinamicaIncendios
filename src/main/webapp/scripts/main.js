/**
 * Main application script for Argentina thermal map visualization
 */

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Argentina Thermal Map Visualization initializing...');
    
    // Initialize the map
    initMap();
    
    // Initialize the data display
    updateDataDisplay();
    
    // Start data simulation for demonstration
    startDataSimulation();
    
    // Set up any additional event listeners
    setupEventListeners();
    
    console.log('Initialization complete.');
  });
  
  // Set up additional event listeners
  function setupEventListeners() {
    // Example of adding a reset button functionality
    document.addEventListener('keydown', function(e) {
      // Reset map on 'R' key press
      if (e.key.toLowerCase() === 'r') {
        resetMap();
      }
    });
  }
  
  // Optional: Include any additional utility functions or app-specific behavior
  function toggleFullScreen() {
    const mapContainer = document.querySelector('.map-container');
    
    if (!document.fullscreenElement) {
      if (mapContainer.requestFullscreen) {
        mapContainer.requestFullscreen();
      } else if (mapContainer.webkitRequestFullscreen) {
        mapContainer.webkitRequestFullscreen();
      } else if (mapContainer.msRequestFullscreen) {
        mapContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  }
