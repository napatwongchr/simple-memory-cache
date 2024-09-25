import express from "express";
const app = express();
const PORT = 3000;

// Simple in-memory cache
let cache = {};

// Middleware to check cache
const cacheMiddleware = (req, res, next) => {
  const key = req.url;
  if (cache[key]) {
    console.log("Cache hit");
    res.send(cache[key]);
  } else {
    console.log("Cache miss");
    next();
  }
};

// Endpoint to get data (simulating data fetch)
app.get("/data", cacheMiddleware, (req, res) => {
  const data = {
    message: "This is the data from the server",
    timestamp: new Date(),
  };
  cache[req.url] = data; // Store the response in cache
  res.send(data);
});

// Endpoint to clear cache
app.get("/clear-cache", (req, res) => {
  cache = {};
  res.send("Cache cleared");
});

app.get("/", (req, res) => {
  res.send("Memory Cache Example");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
