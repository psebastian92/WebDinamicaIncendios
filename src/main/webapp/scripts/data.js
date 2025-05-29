/**
 * Data handling for the Argentina thermal map visualization
 */

// Mock data for the application
const mockData = {
    currentDate: new Date(),
    
    // Daily readings
    readings: [
      {
        date: new Date(),
        generalTemperature: 28.5,
        dangerousTemperature: 35.7,
        soilHumidity: 42,
        airQuality: "Bueno",
        gasLevels: "Normal",
        hasAlert: false,
        alertMessage: ""
      },
      {
        date: new Date(Date.now() - 86400000), // Yesterday
        generalTemperature: 30.2,
        dangerousTemperature: 38.4,
        soilHumidity: 38,
        airQuality: "Regular",
        gasLevels: "Elevado",
        hasAlert: true,
        alertMessage: "¡ALERTA! Temperaturas extremas detectadas en la región norte. Evite actividades al aire libre."
      },
      {
        date: new Date(Date.now() - 172800000), // Two days ago
        generalTemperature: 29.8,
        dangerousTemperature: 37.2,
        soilHumidity: 35,
        airQuality: "Regular",
        gasLevels: "Normal",
        hasAlert: false,
        alertMessage: ""
      }
    ],
    
    // Regional data for map hover information
    regions: [
      { 
        id: "norte",
        name: "Norte", 
        temperature: 39.4,
        humidity: 30,
        danger: "Alto"
      },
      { 
        id: "centro",
        name: "Centro", 
        temperature: 30.2,
        humidity: 42,
        danger: "Medio"
      },
      { 
        id: "sur",
        name: "Sur", 
        temperature: 12.5,
        humidity: 65,
        danger: "Bajo"
      },
      { 
        id: "patagonia",
        name: "Patagonia", 
        temperature: 8.7,
        humidity: 60,
        danger: "Mínimo"
      }
    ]
  };
  
  // Function to format date in DD/MM/YYYY format
  function formatDate(date) {
    return date.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
  
  // Function to get the current data
  function getCurrentData() {
    return mockData.readings[0];
  }
  
  // Function to update the UI with data
  function updateDataDisplay() {
    const currentData = getCurrentData();
    
    // Update date displays
    document.getElementById('current-date').textContent = formatDate(currentData.date);
    document.getElementById('data-date').textContent = formatDate(currentData.date);
    
    // Update sensor data
    document.getElementById('general-temp').textContent = `${currentData.generalTemperature}°C`;
    document.getElementById('danger-temp').textContent = `${currentData.dangerousTemperature}°C`;
    document.getElementById('soil-humidity').textContent = `${currentData.soilHumidity}%`;
    document.getElementById('air-quality').textContent = currentData.airQuality;
    document.getElementById('gas-levels').textContent = currentData.gasLevels;
    
    // Update alert panel
    const alertPanel = document.getElementById('alert-panel');
    const alertMessage = document.getElementById('alert-message');
    
    if (currentData.hasAlert) {
      alertPanel.classList.add('alert-active');
      alertMessage.classList.add('danger');
      alertMessage.textContent = currentData.alertMessage;
    } else {
      alertPanel.classList.remove('alert-active');
      alertMessage.classList.remove('danger');
      alertMessage.textContent = "No hay alertas activas en este momento.";
    }
  }
  
  // Function to simulate data changes (for demo purposes)
  function simulateDataChange() {
    // Rotate the data readings to simulate changing data
    const rotatedReading = mockData.readings.pop();
    mockData.readings.unshift(rotatedReading);
    
    // Update the UI
    updateDataDisplay();
  }
  
  // Initialize timer to periodically change data (for demo)
  let simulationInterval = null;
  
  function startDataSimulation() {
    if (!simulationInterval) {
      simulationInterval = setInterval(simulateDataChange, 10000); // Change data every 10 seconds
    }
  }
  
  function stopDataSimulation() {
    if (simulationInterval) {
      clearInterval(simulationInterval);
      simulationInterval = null;
    }
  }