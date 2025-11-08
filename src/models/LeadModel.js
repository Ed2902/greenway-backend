const { pool } = require("../config/db");

/**
 * Inserta un lead en la base de datos.
 * Reglas que asume el backend:
 * - empresa: requerido (no vacío)
 * - mensaje: requerido, máx 500 chars
 * - email/teléfono: requeridos
 */
async function insertLead({ nombre, empresa, email, telefono, mensaje, origen }) {
  const sql = `
    INSERT INTO leads (nombre, empresa, email, telefono, mensaje, origen)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [nombre, empresa, email, telefono, mensaje, origen ?? null];
  const [result] = await pool.execute(sql, params);
  return result.insertId;
}

/**
 * Lista leads (recientes primero).
 * Si se pasa empresa, filtra por coincidencia exacta.
 */
async function listLeads({ empresa } = {}) {
  if (empresa && empresa.trim() !== "") {
    const sql = `
      SELECT id, created_at, nombre, empresa, email, telefono, mensaje, origen
      FROM leads
      WHERE empresa = ?
      ORDER BY created_at DESC, id DESC
    `;
    const [rows] = await pool.execute(sql, [empresa]);
    return rows;
  } else {
    const sql = `
      SELECT id, created_at, nombre, empresa, email, telefono, mensaje, origen
      FROM leads
      ORDER BY created_at DESC, id DESC
    `;
    const [rows] = await pool.execute(sql);
    return rows;
  }
}

module.exports = { insertLead, listLeads };
