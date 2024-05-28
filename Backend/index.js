import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import multer from "multer";
import pkg from "pg";
const { Pool } = pkg;
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  })
);

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    return next();
  }
  res.status(401).json({ error: "Unauthorized" });
};

app.post("/register", async (req, res) => {
  const { email, name, phone, role, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      "INSERT INTO users (email, name, phone, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, name, phone, role, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.userId = user.id;
      console.log("Session set:", req.session);
      res.json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/user", isAuthenticated, async (req, res) => {
  try {
    console.log("Session data:", req.session);
    const result = await pool.query(
      "SELECT id, email, name, phone, role FROM users WHERE id = $1",
      [req.session.userId]
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.put(
  "/user",
  isAuthenticated,
  upload.single("picture"),
  async (req, res) => {
    const { email, name, phone } = req.body;
    const picture = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.picture;

    try {
      const result = await pool.query(
        "UPDATE users SET email = $1, name = $2, phone = $3, picture = $4 WHERE id = $5 RETURNING *",
        [email, name, phone, picture, req.session.userId]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

app.get("/allusers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err);
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to logout" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

const checkDbConnection = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to the database successfully.");
  } catch (err) {
    console.error("Failed to connect to the database:", err);
  }
};

app.listen(PORT, async () => {
  await checkDbConnection();
  console.log(`Server is running on port ${PORT}`);
});
