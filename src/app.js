const express = require("express");
const cors = require("cors");
const routes = require("./routes/lead.routes");

const app = express();

// CORS
const allowOrigin = process.env.CORS_ORIGIN || "*";
app.use(cors({ origin: allowOrigin }));

// Body parsers
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Healthcheck
app.get("/health", (req, res) => {
  res.json({ ok: true, ts: new Date().toISOString() });
});

// API
app.use("/api", routes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: "NOT_FOUND" });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("[unhandled error]", err);
  res.status(500).json({ error: "INTERNAL_ERROR" });
});

module.exports = app;
