// WITH LED SIGNALSS
#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// Pin Definitions
#define RX_PIN 14
#define TX_PIN 12
#define GPS_BAUD 9600
#define LED_ON_PIN D1     // LED to indicate ESP is on
#define LED_BLINK_PIN D2  // LED to blink when GPS receives data

// WiFi Credentials
const char* ssid = "@mayorgt_";       
const char* password = "11111111xyz"; 

// Firebase Credentials
#define FIREBASE_HOST "virtualfencingtracker-funaab-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "FtaQLktSHQVG2Yy4Ksvp3cJhvcAUZBEgKxAbLopV"

// Initialize Firebase
FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

// GPS Setup
TinyGPSPlus gps;
SoftwareSerial gpsSerial(RX_PIN, TX_PIN);

// Fixed Tracker ID
String trackerID1 = "gps1"; 

void setup() {
    Serial.begin(115200);
    gpsSerial.begin(GPS_BAUD);

    // LED Setup
    pinMode(LED_ON_PIN, OUTPUT);
    pinMode(LED_BLINK_PIN, OUTPUT);

    // Turn on LED to indicate ESP is on
    digitalWrite(LED_ON_PIN, HIGH); // Active LOW for ESP8266

    // Connect to WiFi
    Serial.println("Connecting to WiFi...");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nConnected to WiFi!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());

    // Initialize Firebase
    config.host = FIREBASE_HOST;
    config.signer.tokens.legacy_token = FIREBASE_AUTH;
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);

    Serial.println("Firebase initialized.");
}

void loop() {
    bool gpsDataReceived = false;

    while (gpsSerial.available() > 0) {
        gps.encode(gpsSerial.read());
        gpsDataReceived = true;
    }

    // Blink LED when GPS data is received
    if (gpsDataReceived) {
        digitalWrite(LED_BLINK_PIN, LOW); // Active LOW for ESP8266
        delay(100);
        digitalWrite(LED_BLINK_PIN, HIGH);
    }

    if (gps.location.isUpdated()) {
        float latitude = gps.location.lat();
        float longitude = gps.location.lng();
        float speed = gps.speed.kmph();
        float altitude = gps.altitude.meters();
        float hdop = gps.hdop.value() / 100.0;
        int satellites = gps.satellites.value();

        // Adjust GPS UTC time to Nigeria Time (UTC+1)
        int localHour = (gps.time.hour() + 1) % 24;

        String timestamp = String(gps.date.year()) + "-" + String(gps.date.month()) + "-" + 
                           String(gps.date.day()) + " " + String(localHour) + ":" + 
                           String(gps.time.minute()) + ":" + String(gps.time.second());

        // Debugging GPS Data
        Serial.println("----- GPS Data -----");
        Serial.print("Latitude: "); Serial.println(latitude);
        Serial.print("Longitude: "); Serial.println(longitude);
        Serial.print("Speed: "); Serial.println(speed);
        Serial.print("Altitude: "); Serial.println(altitude);
        Serial.print("HDOP: "); Serial.println(hdop);
        Serial.print("Satellites: "); Serial.println(satellites);
        Serial.print("Timestamp: "); Serial.println(timestamp);

        // Send to Firebase under the fixed tracker ID
        String trackerPath = "/trackers/" + trackerID1;
        
        if (Firebase.setFloat(firebaseData, trackerPath + "/latitude", latitude)) {
            Serial.println("Latitude sent to Firebase.");
        } else {
            Serial.print("Failed to send Latitude: ");
            Serial.println(firebaseData.errorReason());
        }
        
        if (Firebase.setFloat(firebaseData, trackerPath + "/longitude", longitude)) {
            Serial.println("Longitude sent to Firebase.");
        } else {
            Serial.print("Failed to send Longitude: ");
            Serial.println(firebaseData.errorReason());
        }

        if (Firebase.setFloat(firebaseData, trackerPath + "/speed", speed)) {
            Serial.println("Speed sent to Firebase.");
        } else {
            Serial.print("Failed to send Speed: ");
            Serial.println(firebaseData.errorReason());
        }

        if (Firebase.setFloat(firebaseData, trackerPath + "/altitude", altitude)) {
            Serial.println("Altitude sent to Firebase.");
        } else {
            Serial.print("Failed to send Altitude: ");
            Serial.println(firebaseData.errorReason());
        }

        if (Firebase.setFloat(firebaseData, trackerPath + "/hdop", hdop)) {
            Serial.println("HDOP sent to Firebase.");
        } else {
            Serial.print("Failed to send HDOP: ");
            Serial.println(firebaseData.errorReason());
        }

        if (Firebase.setInt(firebaseData, trackerPath + "/satellites", satellites)) {
            Serial.println("Satellites count sent to Firebase.");
        } else {
            Serial.print("Failed to send Satellites: ");
            Serial.println(firebaseData.errorReason());
        }

        if (Firebase.setString(firebaseData, trackerPath + "/timestamp", timestamp)) {
            Serial.println("Timestamp sent to Firebase.");
        } else {
            Serial.print("Failed to send Timestamp: ");
            Serial.println(firebaseData.errorReason());
        }

        Serial.println("----- End of GPS Data -----");
        delay(5000); // Update every 5 seconds
    }
}



// // WITHOUT LED
// #include <ESP8266WiFi.h>
// #include <FirebaseESP8266.h>
// #include <SoftwareSerial.h>
// #include <TinyGPS++.h>

// // Pin Definitions
// #define RX_PIN 14
// #define TX_PIN 12
// #define GPS_BAUD 9600

// // WiFi Credentials
// const char* ssid = "@mayorgt_";       
// const char* password = "11111111xyz"; 

// // Firebase Credentials
// #define FIREBASE_HOST "virtualfencingtracker-funaab-default-rtdb.firebaseio.com"
// #define FIREBASE_AUTH "FtaQLktSHQVG2Yy4Ksvp3cJhvcAUZBEgKxAbLopV"

// // Initialize Firebase
// FirebaseData firebaseData;
// FirebaseAuth auth;
// FirebaseConfig config;

// // GPS Setup
// TinyGPSPlus gps;
// SoftwareSerial gpsSerial(RX_PIN, TX_PIN);

// // Fixed Tracker ID
// String trackerID1 = "gps1"; 

// void setup() {
//     Serial.begin(115200);
//     gpsSerial.begin(GPS_BAUD);

//     // Connect to WiFi
//     WiFi.begin(ssid, password);
//     Serial.print("Connecting to WiFi");
//     while (WiFi.status() != WL_CONNECTED) {
//         Serial.print(".");
//         delay(500);
//     }
//     Serial.println("\nConnected to WiFi!");

//     // Initialize Firebase
//     config.host = FIREBASE_HOST;
//     config.signer.tokens.legacy_token = FIREBASE_AUTH;
//     Firebase.begin(&config, &auth);
//     Firebase.reconnectWiFi(true);
// }

// void loop() {
//     while (gpsSerial.available() > 0) {
//         gps.encode(gpsSerial.read());
//     }

//     if (gps.location.isUpdated()) {
//         float latitude = gps.location.lat();
//         float longitude = gps.location.lng();
//         float speed = gps.speed.kmph();
//         float altitude = gps.altitude.meters();
//         float hdop = gps.hdop.value() / 100.0;
//         int satellites = gps.satellites.value();

//         // Adjust GPS UTC time to Nigeria Time (UTC+1)
//         int localHour = (gps.time.hour() + 1) % 24; // Add 1 hour and handle overflow

//         String timestamp = String(gps.date.year()) + "-" + String(gps.date.month()) + "-" + 
//                            String(gps.date.day()) + " " + String(localHour) + ":" + 
//                            String(gps.time.minute()) + ":" + String(gps.time.second());

//         Serial.println("GPS Data Sent...");

//         // Send to Firebase under the fixed tracker ID
//         String trackerPath = "/trackers/" + trackerID1;
//         Firebase.setFloat(firebaseData, trackerPath + "/latitude", latitude);
//         Firebase.setFloat(firebaseData, trackerPath + "/longitude", longitude);
//         Firebase.setFloat(firebaseData, trackerPath + "/speed", speed);
//         Firebase.setFloat(firebaseData, trackerPath + "/altitude", altitude);
//         Firebase.setFloat(firebaseData, trackerPath + "/hdop", hdop);
//         Firebase.setInt(firebaseData, trackerPath + "/satellites", satellites);
//         Firebase.setString(firebaseData, trackerPath + "/timestamp", timestamp);

//         delay(5000); // Update every 5 seconds
//     }
// }
