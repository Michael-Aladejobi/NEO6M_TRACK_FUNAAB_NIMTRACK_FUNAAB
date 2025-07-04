// Perfectly but time in 12 hours

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

// Reference to the "gps1" and "gps2" data in the database
const gps1Ref = ref(db, "trackers/gps1");
const gps2Ref = ref(db, "trackers/gps2");

// Function to convert 24-hour time to 12-hour format with AM/PM
function formatTo12Hour(timeString) {
  const date = new Date(timeString);
  if (isNaN(date)) return timeString; // fallback if timestamp isn't valid

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12; // convert to 12-hour format
  return `${hours}:${minutes} ${ampm}, ${date.toLocaleDateString()}`;
}

// Function to update the UI with GPS data
function updateUI(sensorId, data) {
  const sensorElement = document.querySelector(`#${sensorId}`);
  if (sensorElement) {
    if (data) {
      const formattedTime = formatTo12Hour(data.timestamp);
      sensorElement.querySelector(".status").textContent = "Active";
      sensorElement.querySelector(".distance").innerHTML = `
        <strong>Latitude:</strong> ${data.latitude}, <br>
        <strong>Longitude:</strong> ${data.longitude} 
        <br><br>
        <strong>Body Temperature: ${data.temperatureC}°C</strong> <br><br>
        <em><small>Last-Seen: ${formattedTime}</em></small>
        <br>
        <br>
        <button style="background-color: #148518; color: #fff; border: none; width: 150px; height: 30px; border-radius: 10px; cursor: pointer">See More...</button>
      `;
    } else {
      sensorElement.querySelector(".distance").textContent = "No Data";
    }
  }
}

// Listen for changes in the database and update the UI for gps1
onValue(gps1Ref, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("GPS1 Data:", data);
    updateUI("sensor-1", data);
  } else {
    console.log("No data available for gps1");
    updateUI("sensor-1", null);
  }
});

// Listen for changes in the database and update the UI for gps2
onValue(gps2Ref, (snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val();
    console.log("GPS2 Data:", data);
    updateUI("sensor-2", data);
  } else {
    console.log("No data available for gps2");
    updateUI("sensor-2", null);
  }
});



// Perfectly but time in 24 hours
// // Import Firebase modules
// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// // Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBAXlE9Xce7C4A0dVMP-Cdej7rn6l8mXNc",
//   authDomain: "virtualfencingtracker-funaab.firebaseapp.com",
//   databaseURL:
//     "https://virtualfencingtracker-funaab-default-rtdb.firebaseio.com",
//   projectId: "virtualfencingtracker-funaab",
//   storageBucket: "virtualfencingtracker-funaab.firebasestorage.app",
//   messagingSenderId: "463680907014",
//   appId: "1:463680907014:web:3bb5790be4acb976376087",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// // Reference to the "gps1" and "gps2" data in the database
// const gps1Ref = ref(db, "trackers/gps1");
// const gps2Ref = ref(db, "trackers/gps2");

// // Function to update the UI with GPS data
// function updateUI(sensorId, data) {
//   const sensorElement = document.querySelector(`#${sensorId}`);
//   if (sensorElement) {
//     if (data) {
//       sensorElement.querySelector(".status").textContent = "Active";
//       sensorElement.querySelector(".distance").innerHTML = `
//         <strong>Latitude:</strong> ${data.latitude}, <br>
//         <strong>Longitude:</strong> ${data.longitude} 
//         <br><br>
//         <strong>Body Temperature: ${data.temperatureC}°C</strong> <br><br>
//         <em><small>Last-Seen: ${data.timestamp}</em></small>
//         <br>
//         <br>
//         <button style="background-color: #148518; color: #fff; border: none; width: 150px; height: 30px; border-radius: 10px; cursor: pointer">See More...</button>
//       `;
//     } else {
//       sensorElement.querySelector(".distance").textContent = "No Data";
//     }
//   }
// }

// // Listen for changes in the database and update the UI for gps1
// onValue(gps1Ref, (snapshot) => {
//   if (snapshot.exists()) {
//     const data = snapshot.val();
//     console.log("GPS1 Data:", data); // Debugging
//     updateUI("sensor-1", data);
//   } else {
//     console.log("No data available for gps1");
//     updateUI("sensor-1", null);
//   }
// });

// // Listen for changes in the database and update the UI for gps2
// onValue(gps2Ref, (snapshot) => {
//   if (snapshot.exists()) {
//     const data = snapshot.val();
//     console.log("GPS2 Data:", data); // Debugging
//     updateUI("sensor-2", data);
//   } else {
//     console.log("No data available for gps2");
//     updateUI("sensor-2", null);
//   }
// });
