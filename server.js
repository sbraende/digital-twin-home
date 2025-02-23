import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

const app = express();
const port = 3000;
const HUE_BRIDGE_IP = process.env.HUE_BRIDGE_IP;
const HUE_API_KEY = process.env.HUE_API_KEY;

app.use(cors()); // Setup server response with CORS Header (all IPs allowed)
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("Hello my man!");
});

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
    const hueResponse = await fetch(`http://${HUE_BRIDGE_IP}/api/${HUE_API_KEY}/lights/${lightId}/state`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lightState),
    });
    if (!hueResponse.ok) {
      throw new Error(`Hue API error: ${hueResponse.statusText}`);
    }
    const hueData = await hueResponse.json();
    res.json(hueData);
  } catch (error) {
    res.status(500).json({ error: "Failed to communicate with Hue Bridge" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
