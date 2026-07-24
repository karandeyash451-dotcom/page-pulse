const express = require("express");
const router = express.Router();

const analyzePage = require("../services/pageAnalyzer");

router.post("/", async (req, res) => {
    try {
        const { url } = req.body;

        // Check if URL is provided
        if (!url) {
            return res.status(400).json({
                error: "URL is required"
            });
        }

        // Validate URL format
        try {
            new URL(url);
        } catch {
            return res.status(400).json({
                error: "Invalid URL"
            });
        }

        // Analyze page
        const report = await analyzePage(url);

        return res.status(200).json(report);

    } catch (error) {

        // Timeout Error
        if (error.code === "ECONNABORTED") {
            return res.status(408).json({
                error: "Request timed out"
            });
        }

        // Non HTML Error
        if (error.message === "Non HTML content") {
            return res.status(400).json({
                error: "Non HTML content"
            });
        }

        // General Server Error
        return res.status(500).json({
            error: error.message || "Internal Server Error"
        });
    }
});

module.exports = router;