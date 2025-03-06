// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAXlE9Xce7C4A0dVMP-Cdej7rn6l8mXNc",
  authDomain: "virtualfencingtracker-funaab.firebaseapp.com",
  databaseURL:
    "https://virtualfencingtracker-funaab-default-rtdb.firebaseio.com",
  projectId: "virtualfencingtracker-funaab",
  storageBucket: "virtualfencingtracker-funaab.firebasestorage.app",
  messagingSenderId: "463680907014",
  appId: "1:463680907014:web:3bb5790be4acb976376087",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to the "gps1" data in the database
const gps1Ref = ref(db, "trackers/gps1");

// Listen for changes in the database and update the UI
onValue(gps1Ref, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("GPS1 Data:", data); // Debugging

    // Select elements to update
    document.querySelector("#sensor-1 .status").textContent = "Active";
    document.querySelector("#sensor-1 .distance").innerHTML = `
      <strong>Lat:</strong> ${data.latitude}, <br>
      <strong>Long:</strong> ${data.longitude} <br>
      <strong>Altitude:</strong> ${data.altitude}m <br>
      <strong>Speed:</strong> ${data.speed} m/s <br>
      <strong>Satellites:</strong> ${data.satellites} <br>
      <strong>HDOP:</strong> ${data.hdop} <br>
      <strong>Time:</strong> ${data.timestamp}
    `;
 document.querySelector("#sensor-1 .temperature").innerHTML = `
      <strong>Body Temperature:</strong> ${data.temperatureC}°C
      
    `;
    // Update the iframe with the new latitude and longitude
    const iframe = document.querySelector("#mapIframe");
    iframe.src = `https://www.google.com/maps?q=${data.latitude},${data.longitude}&output=embed`;
  } else {
    console.log("No data available for gps1");
    document.querySelector("#sensor-1 .distance").textContent = "No Data";
  }
});
