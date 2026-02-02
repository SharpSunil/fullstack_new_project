const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "email_tracker",
  port: process.env.DB_PORT || 3306,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    return;
  }
  console.log("✅ MySQL connected successfully");
});

// Handle unexpected errors
db.on("error", (err) => {
  console.error("MySQL error:", err);
});

// Export connection
module.exports = db;
