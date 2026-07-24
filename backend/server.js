const express = require("express");
const cors = require("cors");

const auditRoutes = require("./routes/audit");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Page Pulse Backend Running");
});

app.use("/api/audit", auditRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});