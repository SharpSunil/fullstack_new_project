require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

/* Multer */
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});
const upload = multer({ storage });

/* Email */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/* Submit Form */
app.post("/api/submit", upload.single("photo"), (req, res) => {
  const { name, email } = req.body;
  const photo = req.file.filename;
  const token = crypto.randomBytes(20).toString("hex");

  const sql = "INSERT INTO submissions (name,email,photo,token) VALUES (?,?,?,?)";
  db.query(sql, [name, email, photo, token], (err, result) => {
    if (err) return res.status(500).send(err);

    const link = `http://localhost:5173/response/${token}`;

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Action Required",
      html: `
        <h3>Hello ${name}</h3>
        <img src="http://localhost:5000/uploads/${photo}" width="150"/>
        <p><a href="${link}">Click Here</a></p>
        <img src="http://localhost:5000/api/open/${token}" width="1" height="1"/>
      `
    });

    res.send({ success: true });
  });
});

/* Track email open */
app.get("/api/open/:token", (req, res) => {
  const { token } = req.params;
  db.query(
    "UPDATE submissions SET email_opened=TRUE WHERE token=?",
    [token]
  );
  res.sendFile(__dirname + "/pixel.png");
});

/* Track button click */
app.post("/api/action", (req, res) => {
  const { token, action } = req.body;

  db.query(
    "SELECT id FROM submissions WHERE token=?",
    [token],
    (err, result) => {
      const submissionId = result[0].id;
      db.query(
        "INSERT INTO user_actions (submission_id,action) VALUES (?,?)",
        [submissionId, action]
      );
      res.send({ success: true });
    }
  );
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
