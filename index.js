const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/scrape", async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).json({ error: "Missing 'url' query parameter" });
  }

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: "networkidle2" });

    const content = await page.content();
    await browser.close();

    res.send(content);
  } catch (err) {
    console.error("Scraping error:", err);
    res.status(500).json({ error: "Failed to scrape the page" });
  }
});

app.get("/", (req, res) => {
  res.send("Cloudflare scraper is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
