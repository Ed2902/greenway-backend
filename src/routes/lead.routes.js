const express = require("express");
const LeadController = require("../controllers/LeadController");

const router = express.Router();

// Guardar un lead
router.post("/leads", LeadController.createLead);

// Visualizar leads (opcionalmente filtrar por empresa)
router.get("/leads", LeadController.listLeads);

module.exports = router;
