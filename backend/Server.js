const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Signin"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database successfully.");
  }
});

app.post('/signin', (req, res) => {
  console.log("Received body:", req.body);

  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  const values = [name, email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("MySQL error:", err.message);
      return res.status(500).json({ error: `Database error: ${err.message}` });
    }
    return res.json({ status: "success", insertId: result.insertId });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("MySQL error:", err.message);
      return res.status(500).json({ error: `Database error: ${err.message}` });
    }
    if (results.length > 0) {
      return res.json({ status: "success", user: results[0] });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  });
});

app.listen(8081, () => {
  console.log("Server is listening on port 8081");
});
