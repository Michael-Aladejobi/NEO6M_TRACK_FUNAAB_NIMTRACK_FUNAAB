#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>

// Pin Definitions
#define RX_PIN 14
#define TX_PIN 12
#define GPS_BAUD 9600

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

    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nConnected to WiFi!");

    // Initialize Firebase
    config.host = FIREBASE_HOST;
    config.signer.tokens.legacy_token = FIREBASE_AUTH;
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);
}

void loop() {
    while (gpsSerial.available() > 0) {
        gps.encode(gpsSerial.read());
    }

    if (gps.location.isUpdated()) {
        float latitude = gps.location.lat();
        float longitude = gps.location.lng();
        float speed = gps.speed.kmph();
        float altitude = gps.altitude.meters();
        float hdop = gps.hdop.value() / 100.0;
        int satellites = gps.satellites.value();

        // Adjust GPS UTC time to Nigeria Time (UTC+1)
        int localHour = (gps.time.hour() + 1) % 24; // Add 1 hour and handle overflow

        String timestamp = String(gps.date.year()) + "-" + String(gps.date.month()) + "-" + 
                           String(gps.date.day()) + " " + String(localHour) + ":" + 
                           String(gps.time.minute()) + ":" + String(gps.time.second());

        Serial.println("GPS Data Sent...");

        // Send to Firebase under the fixed tracker ID
        String trackerPath = "/trackers/" + trackerID1;
        Firebase.setFloat(firebaseData, trackerPath + "/latitude", latitude);
        Firebase.setFloat(firebaseData, trackerPath + "/longitude", longitude);
        Firebase.setFloat(firebaseData, trackerPath + "/speed", speed);
        Firebase.setFloat(firebaseData, trackerPath + "/altitude", altitude);
        Firebase.setFloat(firebaseData, trackerPath + "/hdop", hdop);
        Firebase.setInt(firebaseData, trackerPath + "/satellites", satellites);
        Firebase.setString(firebaseData, trackerPath + "/timestamp", timestamp);

        delay(5000); // Update every 5 seconds
    }
}