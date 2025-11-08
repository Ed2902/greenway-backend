const LeadService = require("../services/LeadService");

async function createLead(req, res) {
  try {
    const id = await LeadService.createLead(req.body);
    return res.status(201).json({ id, message: "Lead registrado" });
  } catch (err) {
    if (err.name === "ZodError") {
      const details = {};
      err.errors.forEach(e => {
        const key = e.path.join(".") || "general";
        details[key] = e.message;
      });
      return res.status(422).json({ error: "VALIDATION_ERROR", details });
    }
    console.error("[createLead] error:", err);
    return res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}

async function listLeads(req, res) {
  try {
    const { empresa } = req.query || {};
    const items = await LeadService.getLeads({ empresa });
    return res.json(items);
  } catch (err) {
    console.error("[listLeads] error:", err);
    return res.status(500).json({ error: "INTERNAL_ERROR" });
  }
}

module.exports = { createLead, listLeads };
