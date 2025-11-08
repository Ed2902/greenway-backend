const { z } = require("zod");
const LeadModel = require("../models/LeadModel");

const leadSchema = z.object({
  nombre: z.string().min(1, "nombre es requerido").max(120),
  empresa: z.string().min(1, "empresa es requerida").max(150),
  email: z.string().email("email inválido").max(150),
  telefono: z
    .string()
    .min(1, "telefono es requerido")
    .max(50)
    .refine((v) => {
      const norm = v.replace(/\s|-/g, "").replace(/^\+/, "");
      return norm.length >= 7 && norm.length <= 20;
    }, "telefono debe tener entre 7 y 20 dígitos (ignorando +, espacios y guiones)"),
  mensaje: z.string().min(1, "mensaje es requerido").max(500, "mensaje no puede exceder 500 caracteres"),
  origen: z.string().max(60).nullable().optional()
});

async function createLead(payload) {
  const data = leadSchema.parse(payload);
  const id = await LeadModel.insertLead(data);
  return id;
}

async function getLeads(filter) {
  return LeadModel.listLeads(filter);
}

module.exports = { createLead, getLeads };
