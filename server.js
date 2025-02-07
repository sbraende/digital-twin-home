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
      `http://${HUE_BRIDGE_IP}/api/${HUE_API_KEY}/lights/5`
    );
    const data = await res.json();
    response.send(data);
  } catch (error) {
    response.status(500).send("Error fetching light data: " + error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
