// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// // Use your Firebase config
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

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// const mapBtn = document.getElementById("mapOverviewBtn");
// const mapModal = document.getElementById("mapModal");
// const closeBtn = document.getElementById("closeMapModal");
// const mapDiv = document.getElementById("overviewMap");

// let map;
// let markers = {};

// function showModal() {
//   mapModal.style.display = "flex";
//   setTimeout(() => {
//     if (!map) {
//       map = L.map(mapDiv).setView([7.15, 3.35], 14); // Default center
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; OpenStreetMap contributors",
//       }).addTo(map);
//       loadTrackers();
//     } else {
//       map.invalidateSize();
//     }
//   }, 100); // Wait for modal to be visible
// }

// function hideModal() {
//   mapModal.style.display = "none";
// }

// mapBtn.onclick = showModal;
// closeBtn.onclick = hideModal;

// // Load all tracker positions from Firebase and update markers
// function loadTrackers() {
//   const trackersRef = ref(db, "trackers");
//   onValue(trackersRef, (snapshot) => {
//     const data = snapshot.val();
//     if (!data) return;
//     let bounds = [];
//     Object.entries(data).forEach(([trackerId, tracker]) => {
//       if (tracker.latitude && tracker.longitude) {
//         const lat = tracker.latitude;
//         const lng = tracker.longitude;
//         bounds.push([lat, lng]);
//         if (!markers[trackerId]) {
//           markers[trackerId] = L.marker([lat, lng])
//             .addTo(map)
//             .bindPopup(
//               `<b>${trackerId.toUpperCase()}</b><br>Lat: ${lat}<br>Lng: ${lng}`
//             );
//         } else {
//           markers[trackerId].setLatLng([lat, lng]);
//           markers[trackerId].setPopupContent(
//             `<b>${trackerId.toUpperCase()}</b><br>Lat: ${lat}<br>Lng: ${lng}`
//           );
//         }
//       }
//     });
//     // Remove markers for trackers no longer present
//     Object.keys(markers).forEach((id) => {
//       if (!data[id] || !data[id].latitude || !data[id].longitude) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//       }
//     });
//     // Fit map to markers
//     if (bounds.length > 0) {
//       map.fitBounds(bounds, { padding: [40, 40] });
//     }
//   });
// }



// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// // Your Firebase config
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

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// const mapBtn = document.getElementById("mapOverviewBtn");
// const mapModal = document.getElementById("mapModal");
// const closeBtn = document.getElementById("closeMapModal");
// const mapDiv = document.getElementById("overviewMap");

// let map;
// let markers = {};

// function showModal() {
//   mapModal.style.display = "flex";
//   setTimeout(() => {
//     if (!map) {
//       map = L.map(mapDiv).setView([7.15, 3.35], 14); // Default center
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; OpenStreetMap contributors",
//       }).addTo(map);
//       loadTrackers();
//     } else {
//       map.invalidateSize();
//     }
//   }, 100);
// }

// function hideModal() {
//   mapModal.style.display = "none";
// }

// mapBtn.onclick = showModal;
// closeBtn.onclick = hideModal;

// // Helper: Reverse geocode using Nominatim
// async function getAddress(lat, lng) {
//   try {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
//     const response = await fetch(url, {
//       headers: { "User-Agent": "NimTrack/1.0" },
//     });
//     if (!response.ok) return "Address not found";
//     const data = await response.json();
//     return data.display_name || "Address not found";
//   } catch {
//     return "Address not found";
//   }
// }

// // Load all tracker positions from Firebase and update markers
// function loadTrackers() {
//   const trackersRef = ref(db, "trackers");
//   onValue(trackersRef, (snapshot) => {
//     const data = snapshot.val();
//     if (!data) return;
//     let bounds = [];
//     Object.entries(data).forEach(async ([trackerId, tracker]) => {
//       if (tracker.latitude && tracker.longitude) {
//         const lat = tracker.latitude;
//         const lng = tracker.longitude;
//         bounds.push([lat, lng]);
//         let popupContent = `<b>${trackerId.toUpperCase()}</b><br>Lat: ${lat}<br>Lng: ${lng}<br>Loading address...`;

//         if (!markers[trackerId]) {
//           markers[trackerId] = L.marker([lat, lng])
//             .addTo(map)
//             .bindPopup(popupContent)
//             .openPopup();
//         } else {
//           markers[trackerId].setLatLng([lat, lng]);
//           markers[trackerId].setPopupContent(popupContent);
//         }

//         // Fetch and update address
//         const address = await getAddress(lat, lng);
//         popupContent = `<b>${trackerId.toUpperCase()}</b><br>Lat: ${lat}<br>Lng: ${lng}<br><b>Address:</b> ${address}`;
//         markers[trackerId].setPopupContent(popupContent);
//       }
//     });
//     // Remove markers for trackers no longer present
//     Object.keys(markers).forEach((id) => {
//       if (!data[id] || !data[id].latitude || !data[id].longitude) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//       }
//     });
//     // Fit map to markers
//     if (bounds.length > 0) {
//       map.fitBounds(bounds, { padding: [40, 40] });
//     }
//   });
// }








// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// // Your Firebase config
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

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// const mapBtn = document.getElementById("mapOverviewBtn");
// const mapModal = document.getElementById("mapModal");
// const closeBtn = document.getElementById("closeMapModal");
// const mapDiv = document.getElementById("overviewMap");

// let map;
// let markers = {};

// function showModal() {
//   mapModal.style.display = "flex";
//   setTimeout(() => {
//     if (!map) {
//       map = L.map(mapDiv).setView([7.15, 3.35], 14); // Default center
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; OpenStreetMap contributors",
//       }).addTo(map);
//       loadTrackers();
//     } else {
//       map.invalidateSize();
//     }
//   }, 100);
// }

// function hideModal() {
//   mapModal.style.display = "none";
// }

// mapBtn.onclick = showModal;
// closeBtn.onclick = hideModal;

// // Helper: Reverse geocode using Nominatim
// async function getAddress(lat, lng) {
//   try {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
//     const response = await fetch(url, {
//       headers: { "User-Agent": "NimTrack/1.0" },
//     });
//     if (!response.ok) return "Address not found";
//     const data = await response.json();
//     return data.display_name || "Address not found";
//   } catch {
//     return "Address not found";
//   }
// }

// // Load all tracker positions from Firebase and update markers
// function loadTrackers() {
//   const trackersRef = ref(db, "trackers");
//   onValue(trackersRef, (snapshot) => {
//     const data = snapshot.val();
//     if (!data) return;
//     let bounds = [];
//     Object.entries(data).forEach(async ([trackerId, tracker]) => {
//       if (tracker.latitude && tracker.longitude) {
//         const lat = tracker.latitude;
//         const lng = tracker.longitude;
//         const temp =
//           tracker.temperatureC !== undefined
//             ? tracker.temperatureC + "°C"
//             : tracker.temperature !== undefined
//             ? tracker.temperature + "°C"
//             : "N/A";
//         bounds.push([lat, lng]);
//         let popupContent = `<b>${trackerId.toUpperCase()}</b><br>
//           Lat: ${lat}<br>
//           Lng: ${lng}<br>
//           <b>Body Temperature:</b> ${temp}<br>
//           Loading address...`;

//         if (!markers[trackerId]) {
//           markers[trackerId] = L.marker([lat, lng])
//             .addTo(map)
//             .bindPopup(popupContent)
//             .openPopup();
//         } else {
//           markers[trackerId].setLatLng([lat, lng]);
//           markers[trackerId].setPopupContent(popupContent);
//         }

//         // Fetch and update address
//         const address = await getAddress(lat, lng);
//         popupContent = `<b>${trackerId.toUpperCase()}</b><br>
//           Lat: ${lat}<br>
//           Lng: ${lng}<br>
//           <b>Body Temperature:</b> ${temp}<br>
//           <b>Address:</b> ${address}`;
//         markers[trackerId].setPopupContent(popupContent);
//       }
//     });
//     // Remove markers for trackers no longer present
//     Object.keys(markers).forEach((id) => {
//       if (!data[id] || !data[id].latitude || !data[id].longitude) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//       }
//     });
//     // Fit map to markers
//     if (bounds.length > 0) {
//       map.fitBounds(bounds, { padding: [40, 40] });
//     }
//   });
// }







// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// import {
//   getDatabase,
//   ref,
//   onValue,
// } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// // Your Firebase config
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

// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// const mapBtn = document.getElementById("mapOverviewBtn");
// const mapModal = document.getElementById("mapModal");
// const closeBtn = document.getElementById("closeMapModal");
// const mapDiv = document.getElementById("overviewMap");

// let map;
// let markers = {};

// function showModal() {
//   mapModal.style.display = "flex";
//   setTimeout(() => {
//     if (!map) {
//       map = L.map(mapDiv).setView([7.15, 3.35], 14); // Default center
//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution: "&copy; OpenStreetMap contributors",
//       }).addTo(map);
//       loadTrackers();
//     } else {
//       map.invalidateSize();
//     }
//   }, 100);
// }

// function hideModal() {
//   mapModal.style.display = "none";
// }

// mapBtn.onclick = showModal;
// closeBtn.onclick = hideModal;

// // Helper: Reverse geocode using Nominatim
// async function getAddress(lat, lng) {
//   try {
//     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
//     const response = await fetch(url, {
//       headers: { "User-Agent": "NimTrack/1.0" },
//     });
//     if (!response.ok) return "Address not found";
//     const data = await response.json();
//     return data.display_name || "Address not found";
//   } catch {
//     return "Address not found";
//   }
// }

// // Helper: Format timestamp to readable date and time
// function formatTimestamp(ts) {
//   if (!ts) return "N/A";
//   // If UNIX timestamp (number), convert to ms
//   if (!isNaN(ts)) {
//     if (ts.toString().length === 10) ts = Number(ts) * 1000;
//     else ts = Number(ts);
//     return new Date(ts).toLocaleString();
//   }
//   // If ISO string
//   const d = new Date(ts);
//   if (!isNaN(d.getTime())) return d.toLocaleString();
//   return ts;
// }

// // Load all tracker positions from Firebase and update markers
// function loadTrackers() {
//   const trackersRef = ref(db, "trackers");
//   onValue(trackersRef, (snapshot) => {
//     const data = snapshot.val();
//     if (!data) return;
//     let bounds = [];
//     Object.entries(data).forEach(async ([trackerId, tracker]) => {
//       if (tracker.latitude && tracker.longitude) {
//         const lat = tracker.latitude;
//         const lng = tracker.longitude;
//         const temp =
//           tracker.temperatureC !== undefined
//             ? tracker.temperatureC + "°C"
//             : tracker.temperature !== undefined
//             ? tracker.temperature + "°C"
//             : "N/A";
//         const lastSeen = tracker.timestamp
//           ? formatTimestamp(tracker.timestamp)
//           : "N/A";
//         bounds.push([lat, lng]);
//         let popupContent = `<b>${trackerId.toUpperCase()}</b><br>
//           Lat: ${lat}<br>
//           Lng: ${lng}<br>
//           <b>Body Temperature:</b> ${temp}<br>
//           <b>Last Seen:</b> ${lastSeen}<br>
//           Loading address...`;

//         if (!markers[trackerId]) {
//           markers[trackerId] = L.marker([lat, lng])
//             .addTo(map)
//             .bindPopup(popupContent)
//             .openPopup();
//         } else {
//           markers[trackerId].setLatLng([lat, lng]);
//           markers[trackerId].setPopupContent(popupContent);
//         }

//         // Fetch and update address
//         const address = await getAddress(lat, lng);
//         popupContent = `<b>${trackerId.toUpperCase()}</b><br>
//           Lat: ${lat}<br>
//           Lng: ${lng}<br>
//           <b>Body Temperature:</b> ${temp}<br>
//           <b>Last Seen:</b> ${lastSeen}<br>
//           <b>Address:</b> ${address}`;
//         markers[trackerId].setPopupContent(popupContent);
//       }
//     });
//     // Remove markers for trackers no longer present
//     Object.keys(markers).forEach((id) => {
//       if (!data[id] || !data[id].latitude || !data[id].longitude) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//       }
//     });
//     // Fit map to markers
//     if (bounds.length > 0) {
//       map.fitBounds(bounds, { padding: [40, 40] });
//     }
//   });
// }








import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

// Your Firebase config
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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const mapBtn = document.getElementById("mapOverviewBtn");
const mapModal = document.getElementById("mapModal");
const closeBtn = document.getElementById("closeMapModal");
const mapDiv = document.getElementById("overviewMap");

let map;
let markers = {};

// Marker colors for each tracker (add more if you have more trackers)
const trackerColors = [
  "red", // Tracker 1
  "blue", // Tracker 2
  "green", // Tracker 3
  "orange", // Tracker 4
  "violet", // Tracker 5
  "grey", // Tracker 6
  "yellow", // Tracker 7
];

// Helper to get marker icon by color
function getColoredIcon(color) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

function showModal() {
  mapModal.style.display = "flex";
  setTimeout(() => {
    if (!map) {
      map = L.map(mapDiv).setView([7.15, 3.35], 14); // Default center
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);
      loadTrackers();
    } else {
      map.invalidateSize();
    }
  }, 100);
}

function hideModal() {
  mapModal.style.display = "none";
}

mapBtn.onclick = showModal;
closeBtn.onclick = hideModal;

// Helper: Reverse geocode using Nominatim
async function getAddress(lat, lng) {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
    const response = await fetch(url, {
      headers: { "User-Agent": "NimTrack/1.0" },
    });
    if (!response.ok) return "Address not found";
    const data = await response.json();
    return data.display_name || "Address not found";
  } catch {
    return "Address not found";
  }
}

// Helper: Format timestamp to readable date and time
function formatTimestamp(ts) {
  if (!ts) return "N/A";
  // If UNIX timestamp (number), convert to ms
  if (!isNaN(ts)) {
    if (ts.toString().length === 10) ts = Number(ts) * 1000;
    else ts = Number(ts);
    return new Date(ts).toLocaleString();
  }
  // If ISO string
  const d = new Date(ts);
  if (!isNaN(d.getTime())) return d.toLocaleString();
  return ts;
}

// Load all tracker positions from Firebase and update markers
function loadTrackers() {
  const trackersRef = ref(db, "trackers");
  onValue(trackersRef, (snapshot) => {
    const data = snapshot.val();
    if (!data) return;
    let bounds = [];
    const trackerIds = Object.keys(data);
    Object.entries(data).forEach(async ([trackerId, tracker], idx) => {
      if (tracker.latitude && tracker.longitude) {
        const lat = tracker.latitude;
        const lng = tracker.longitude;
        const temp =
          tracker.temperatureC !== undefined
            ? tracker.temperatureC + "°C"
            : tracker.temperature !== undefined
            ? tracker.temperature + "°C"
            : "N/A";
        const lastSeen = tracker.timestamp
          ? formatTimestamp(tracker.timestamp)
          : "N/A";
        bounds.push([lat, lng]);
        let popupContent = `<b>${trackerId.toUpperCase()}</b><br>
          Lat: ${lat}<br>
          Lng: ${lng}<br>
          <b>Body Temperature:</b> ${temp}<br>
          <b>Last Seen:</b> ${lastSeen}<br>
          Loading address...`;

        // Assign color by index
        const color = trackerColors[idx % trackerColors.length];
        const icon = getColoredIcon(color);

        if (!markers[trackerId]) {
          markers[trackerId] = L.marker([lat, lng], { icon })
            .addTo(map)
            .bindPopup(popupContent)
            .openPopup();
        } else {
          markers[trackerId].setLatLng([lat, lng]);
          markers[trackerId].setIcon(icon);
          markers[trackerId].setPopupContent(popupContent);
        }

        // Fetch and update address
        const address = await getAddress(lat, lng);
        popupContent = `<b>${trackerId.toUpperCase()}</b><br>
          Lat: ${lat}<br>
          Lng: ${lng}<br>
          <b>Body Temperature:</b> ${temp}<br>
          <b>Last Seen:</b> ${lastSeen}<br>
          <b>Address:</b> ${address}`;
        markers[trackerId].setPopupContent(popupContent);
      }
    });
    // Remove markers for trackers no longer present
    Object.keys(markers).forEach((id) => {
      if (!data[id] || !data[id].latitude || !data[id].longitude) {
        map.removeLayer(markers[id]);
        delete markers[id];
      }
    });
    // Fit map to markers
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  });
}