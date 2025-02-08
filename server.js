import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";

const app = express();
const port = 3000;
const HUE_BRIDGE_IP = process.env.HUE_BRIDGE_IP;
const HUE_API_KEY = process.env.HUE_API_KEY;

app.use(cors()); // Setup server response with CORS Header (all IPs allowed)

app.get("/", (request, response) => {
  response.send("Hello my man!");
});

app.get("/light", async (request, response) => {
  try {
    const res = await fetch(
      `http://${HUE_BRIDGE_IP}/api/${HUE_API_KEY}/lights`
    );
    const data = await res.json();
    response.send(data);
  } catch (error) {
    response.status(500).send("Error fetching light data: " + error.message);
  }
});

app.get("/off", async (request, response) => {
  const res = await fetch(
    `http://${HUE_BRIDGE_IP}/api/${HUE_API_KEY}/lights/5/state`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ on: false }),
    }
  );
  const data = await res.json();
  response.send(data);
});

app.get("/on", async (request, response) => {
  const res = await fetch(
    `http://${HUE_BRIDGE_IP}/api/${HUE_API_KEY}/lights/5/state`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ on: true }),
    }
  );
  const data = await res.json();
  response.send(data);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
