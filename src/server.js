require("dotenv").config();
const app = require("./app");
const { ping } = require("./config/db");

const PORT = Number(process.env.PORT || 3000);

(async () => {
  try {
    await ping();
    console.log("✅ Conexión a MariaDB OK");
  } catch (e) {
    console.error("❌ No se pudo conectar a MariaDB:", e?.message || e);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 API escuchando en http://localhost:${PORT}`);
  });
})();
