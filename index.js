const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/scrape', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing "url" query parameter.');
  }

  try {
    const browser = await puppeteer.launch({
      executablePath: '/usr/bin/google-chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle2', timeout: 60000 });

    const html = await page.content();

    await browser.close();
    res.send(html);

  } catch (error) {
    console.error('Scraping error:', error.message);
    res.status(500).send('Failed to scrape the page.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
