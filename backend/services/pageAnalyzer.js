const axios = require("axios");
const cheerio = require("cheerio");

const analyzePage = async (url) => {
    const startTime = Date.now();

    const response = await axios.get(url, {
        timeout: 5000
    });

    const responseTime = Date.now() - startTime;

    if (!response.headers["content-type"]?.includes("text/html")) {
        throw new Error("Non HTML content");
    }

    const html = response.data;
    const $ = cheerio.load(html);

    const title = $("title").first().text().trim();

    const metaDescription =
        $('meta[name="description"]').attr("content") ||
        "Not Found";

    const h1Count = $("h1").length;

    const missingAltImages = $("img")
        .filter((i, el) => !$(el).attr("alt"))
        .length;

    const bodyText = $("body").text();

    const wordCount = bodyText
        .replace(/\s+/g, " ")
        .trim()
        .split(" ")
        .length;

    // SEO Score Calculation
    let seoScore = 100;

    if (h1Count === 0) seoScore -= 20;

    if (missingAltImages > 10) seoScore -= 20;

    if (wordCount < 300) seoScore -= 20;

    if (
        !metaDescription ||
        metaDescription === "Not Found"
    ) {
        seoScore -= 20;
    }

    return {
        status: response.status,
        responseTime,
        seoScore,
        title,
        metaDescription,
        h1Count,
        missingAltImages,
        wordCount
    };
};

module.exports = analyzePage;