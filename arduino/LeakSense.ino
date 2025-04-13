// LeakSense Arduino Integration
#include <ArduinoJson.h>

// Pin definitions
const int MQ2_PIN = A0;    // MQ-2 sensor for LPG, smoke, and combustible gas
const int MQ135_PIN = A1;  // MQ-135 sensor for air quality and CO2
const int LM35_PIN = A2;   // LM35 temperature sensor

// Sensor calibration values
const float MQ2_RL = 10.0;      // Load resistance in kΩ
const float MQ2_R0 = 10.0;      // Sensor resistance in clean air
const float MQ135_RL = 10.0;    // Load resistance in kΩ
const float MQ135_R0 = 10.0;    // Sensor resistance in clean air

void setup() {
  Serial.begin(9600);
  
  // Allow sensors to warm up and stabilize
  delay(20000);
}

float getMQ2Reading() {
  float sensorValue = analogRead(MQ2_PIN);
  float rs = ((1023.0 / sensorValue) - 1.0) * MQ2_RL;
  float ratio = rs / MQ2_R0;
  return ratio;
}

float getMQ135Reading() {
  float sensorValue = analogRead(MQ135_PIN);
  float rs = ((1023.0 / sensorValue) - 1.0) * MQ135_RL;
  float ratio = rs / MQ135_R0;
  return ratio;
}

float getTemperature() {
  float sensorValue = analogRead(LM35_PIN);
  float temperature = (sensorValue * 500.0) / 1023.0;  // Convert to Celsius
  return temperature;
}

void loop() {
  // Create JSON document
  StaticJsonDocument<200> doc;
  
  // Read sensor values
  float mq2Value = getMQ2Reading();
  float mq135Value = getMQ135Reading();
  float temperature = getTemperature();
  
  // Populate JSON document
  doc["mq2"] = mq2Value;
  doc["mq135"] = mq135Value;
  doc["temperature"] = temperature;
  doc["timestamp"] = millis();
  
  // Serialize JSON to Serial
  serializeJson(doc, Serial);
  Serial.println();
  
  // Wait before next reading
  delay(1000);
}