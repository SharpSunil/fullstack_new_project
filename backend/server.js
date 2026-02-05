require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const path = require("path");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* ---------- Multer ---------- */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage });

/* ---------- Email ---------- */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/* Verify Gmail */
transporter.verify((err) => {
  if (err) {
    console.error("❌ Gmail auth failed:", err);
  } else {
    console.log("✅ Gmail ready to send emails");
  }
});

/* ---------- Submit Form ---------- */
app.post("/api/submit", upload.single("photo"), (req, res) => {
  const { name, email } = req.body;

  if (!name || !email || !req.file) {
    return res.status(400).json({ message: "All fields required" });
  }

  const photo = req.file.filename;
  const token = crypto.randomBytes(20).toString("hex");

  const sql =
    "INSERT INTO submissions (name,email,photo,token) VALUES (?,?,?,?)";

  db.query(sql, [name, email, photo, token], (err) => {
    if (err) {
      console.error("❌ DB Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    const link = `http://localhost:5173/response/${token}`;

    transporter.sendMail(
      {
        from: `"Email Tracker" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Action Required",
        html: `
          <h3>Hello ${name}</h3>
          <p>Please review the request below.</p>

          <img src="http://localhost:5000/uploads/${photo}" width="120"/>

          <p>
            <a href="${link}" target="_blank">Click Here</a>
          </p>

          <img src="http://localhost:5000/api/open/${token}" width="1" height="1"/>
        `,
      },
      (mailErr, info) => {
        if (mailErr) {
          console.error("❌ Email failed:", mailErr);
          return res.status(500).json({ message: "Email failed" });
        }

        console.log("✅ Email sent:", info.response);
        res.json({ success: true });
      }
    );
  });
});

/* ---------- Track Email Open ---------- */
app.get("/api/open/:token", (req, res) => {
  db.query(
    "UPDATE submissions SET email_opened=TRUE WHERE token=?",
    [req.params.token]
  );
  res.sendFile(path.join(__dirname, "pixel.png"));
});

/* ---------- Track YES / NO ---------- */
app.post("/api/action", (req, res) => {
  const { token, action } = req.body;

  db.query(
    "SELECT id FROM submissions WHERE token=?",
    [token],
    (err, result) => {
      if (!result || result.length === 0) {
        return res.status(404).json({ message: "Invalid token" });
      }

      db.query(
        "INSERT INTO user_actions (submission_id,action) VALUES (?,?)",
        [result[0].id, action]
      );

      res.json({ success: true });
    }
  );
});

/* ---------- Start Server ---------- */
app.listen(process.env.PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${process.env.PORT}`);
});
