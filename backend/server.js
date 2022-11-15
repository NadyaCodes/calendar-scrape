import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const PORT = 5002;
const app = express();

app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
};

const requestEndpoint =
  "https://www.soulpepper.ca/performances/season-calendar";

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get("/getData", cors(corsOptions), async (req, res) => {
  const fetchOptions = {
    method: "GET",
  };
  const response = await fetch(requestEndpoint, fetchOptions);
  const responseText = await response.text();
  res.json(responseText);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
