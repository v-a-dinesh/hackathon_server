require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const indexRouter=require("./routes/index")

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use(indexRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
