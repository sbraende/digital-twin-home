import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

const app = express();
const port = 3000;
const HUE_BRIDGE_IP = process.env.HUE_BRIDGE_IP;
const HUE_API_KEY = process.env.HUE_API_KEY;
const OPENWEATHER_KEY = process.env.OPENWEATHER_KEY;
const location = {
  latitude: 59.895012,
  longitude: 10.621807,
};

app.use(cors()); // Setup server response with CORS Header (all IPs allowed)
app.use(express.json());

app.get("/lights", async (req, res) => {
  try {
    const hueResponse = await fetch(`http://${HUE_BRIDGE_IP}/api/${HUE_API_KEY}/lights`);
    const data = await hueResponse.json();
    res.send(data);
  } catch (error) {
    res.status(500).send("Error fetching light data: " + error.message);
  }
});

app.put("/lightState", async (req, res) => {
  const { lightId, lightState } = req.body;
  try {
    const hueResponse = await fetch(
      `http://${HUE_BRIDGE_IP}/api/${HUE_API_KEY}/lights/${lightId}/state`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lightState),
      }
    );
    if (!hueResponse.ok) {
      throw new Error(`Hue API error: ${hueResponse.statusText}`);
    }
    const hueData = await hueResponse.json();
    res.json(hueData);
  } catch (error) {
    res.status(500).json({ error: "Failed to communicate with Hue Bridge" });
  }
});

app.get("/weather", async (req, res) => {
  try {
    const openWeatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${OPENWEATHER_KEY}&units=metric`
    );
    const weatherData = await openWeatherResponse.json();
    res.send(weatherData);
  } catch (error) {
    console.error("Could not fetch data from OpenWeatherAPI", error);
  }
});

app.listen(port, () => {
  console.log(`Twin listening to requests from port: ${port}`);
});

// TEST AREA
// app.get("/", async (req, res) => {
//   res.send("Hello my man!");
// });
