/**
 * Map handling for the Argentina thermal map visualization
 */

// Map state variables
let mapScale = 1;
let mapTranslateX = 0;
let mapTranslateY = 0;
let isDragging = false;
let startX, startY;
let lastX, lastY;

// DOM Elements
let map;
let mapWrapper;
let mapImage;

// Initialize map functionality
function initMap() {
  map = document.getElementById('map');
  mapWrapper = document.getElementById('map-wrapper');
  mapImage = document.getElementById('map-image');
  
  // Add map interaction event listeners
  setupMapInteractions();
  
  // Update map transform
  updateMapTransform();
}

// Set up map event listeners for interactions
function setupMapInteractions() {
  // Mouse events for dragging
  mapWrapper.addEventListener('mousedown', handleDragStart);
  window.addEventListener('mousemove', handleDragMove);
  window.addEventListener('mouseup', handleDragEnd);
  
  // Touch events for mobile
  mapWrapper.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchmove', handleTouchMove);
  window.addEventListener('touchend', handleTouchEnd);
  
  // Zoom controls
  document.getElementById('zoom-in').addEventListener('click', () => {
    zoomMap(0.1);
  });
  
  document.getElementById('zoom-out').addEventListener('click', () => {
    zoomMap(-0.1);
  });
  
  // Prevent the default behavior for the image to avoid issues
  mapImage.addEventListener('dragstart', (e) => {
    e.preventDefault();
  });
  
  // Mouse wheel zoom
  mapWrapper.addEventListener('wheel', handleWheel);
}

// Handle mouse wheel zoom
function handleWheel(e) {
  e.preventDefault();
  const delta = e.deltaY > 0 ? -0.1 : 0.1;
  zoomMap(delta);
}

// Handle drag start
function handleDragStart(e) {
  isDragging = true;
  startX = e.clientX || (e.touches && e.touches[0].clientX);
  startY = e.clientY || (e.touches && e.touches[0].clientY);
  lastX = startX;
  lastY = startY;
  
  mapWrapper.style.cursor = 'grabbing';
}

// Handle drag move
function handleDragMove(e) {
  if (!isDragging) return;
  
  const clientX = e.clientX || (e.touches && e.touches[0].clientX);
  const clientY = e.clientY || (e.touches && e.touches[0].clientY);
  
  const deltaX = clientX - lastX;
  const deltaY = clientY - lastY;
  
  lastX = clientX;
  lastY = clientY;
  
  // Move the map
  mapTranslateX += deltaX;
  mapTranslateY += deltaY;
  
  // Update the map position
  updateMapTransform();
}

// Handle drag end
function handleDragEnd() {
  isDragging = false;
  mapWrapper.style.cursor = 'grab';
}

// Handle touch start
function handleTouchStart(e) {
  if (e.touches.length === 1) {
    handleDragStart(e);
  }
}

// Handle touch move
function handleTouchMove(e) {
  if (e.touches.length === 1) {
    handleDragMove(e);
  }
}

// Handle touch end
function handleTouchEnd() {
  handleDragEnd();
}

// Zoom map function
function zoomMap(delta) {
  // Calculate new scale with limits
  const newScale = Math.max(0.5, Math.min(3, mapScale + delta));
  const scaleFactor = newScale / mapScale;
  
  // Apply the new scale
  mapScale = newScale;
  
  // Update the transform
  updateMapTransform();
}

// Update map transform
function updateMapTransform() {
  map.style.transform = `translate(${mapTranslateX}px, ${mapTranslateY}px) scale(${mapScale})`;
}

// Reset map to initial state
function resetMap() {
  mapScale = 1;
  mapTranslateX = 0;
  mapTranslateY = 0;
  updateMapTransform();
}