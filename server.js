const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
// Routes
const ticketRoutes = require("./routes/ticket");
app.use("/api/ticket", ticketRoutes);

app.get("/", (req, res) => {
    res.send("BlockTrain Backend Running");
});

app.listen(process.env.PORT, () => {
    console.log("Server chạy cổng", process.env.PORT);
});
