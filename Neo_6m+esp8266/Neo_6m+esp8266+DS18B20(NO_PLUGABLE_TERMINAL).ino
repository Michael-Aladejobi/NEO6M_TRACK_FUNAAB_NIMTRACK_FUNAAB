#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <SoftwareSerial.h>
#include <TinyGPS++.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Pin Definitions
#define RX_PIN 14
#define TX_PIN 12
#define GPS_BAUD 9600
#define ONE_WIRE_BUS D2  // GPIO D2 on ESP8266

// WiFi Credentials
const char* ssid = "mayorgt_";
const char* password = "00000000sxyz";

// Firebase Credentials
#define FIREBASE_HOST "virtualfencingtracker-funaab-default-rtdb.firebaseio.com"
#define FIREBASE_AUTH "FtaQLktSHQVG2Yy4Ksvp3cJhvcAUZBEgKxAbLopV"

// Firebase and GPS objects
FirebaseData firebaseData;
FirebaseAuth auth;
FirebaseConfig config;

TinyGPSPlus gps;
SoftwareSerial gpsSerial(RX_PIN, TX_PIN);

// DS18B20 setup
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
DeviceAddress sensorAddress;

// Tracker ID
String trackerID2 = "gps2";

void setup() {
    Serial.begin(115200);
    gpsSerial.begin(GPS_BAUD);

    // Activate internal pull-up resistor on DS18B20 data pin
    pinMode(D2, INPUT_PULLUP);

    // Connect to WiFi
    WiFi.begin(ssid, password);
    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("\nConnected to WiFi!");

    // Firebase setup
    config.host = FIREBASE_HOST;
    config.signer.tokens.legacy_token = FIREBASE_AUTH;
    Firebase.begin(&config, &auth);
    Firebase.reconnectWiFi(true);

    // Temp sensor setup
    sensors.begin();
    if (!sensors.getAddress(sensorAddress, 0)) {
        Serial.println("Error: No DS18B20 sensor found");
        while (true); // Stop here if sensor isn't found
    }
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

        // Convert GPS UTC time to Nigerian local time (UTC+1)
        int localHour = (gps.time.hour() + 1) % 24;
        String timestamp = String(gps.date.year()) + "-" + String(gps.date.month()) + "-" +
                           String(gps.date.day()) + " " + String(localHour) + ":" +
                           String(gps.time.minute()) + ":" + String(gps.time.second());

        Serial.println("GPS Data Sent...");

        // Get temperature
        sensors.requestTemperatures();
        float temperatureC = sensors.getTempC(sensorAddress);

        if (temperatureC == DEVICE_DISCONNECTED_C) {
            Serial.println("Error: Could not read temperature data");
        } else {
            Serial.print("Temperature: ");
            Serial.print(temperatureC);
            Serial.println(" °C");

            // Upload to Firebase
            String trackerPath = "/trackers/" + trackerID2;
            Firebase.setFloat(firebaseData, trackerPath + "/latitude", latitude);
            Firebase.setFloat(firebaseData, trackerPath + "/longitude", longitude);
            Firebase.setFloat(firebaseData, trackerPath + "/speed", speed);
            Firebase.setFloat(firebaseData, trackerPath + "/altitude", altitude);
            Firebase.setFloat(firebaseData, trackerPath + "/hdop", hdop);
            Firebase.setInt(firebaseData, trackerPath + "/satellites", satellites);
            Firebase.setString(firebaseData, trackerPath + "/timestamp", timestamp);
            Firebase.setFloat(firebaseData, trackerPath + "/temperatureC", temperatureC);
        }

        delay(5000); // Wait 5 seconds before next update
    }
}
