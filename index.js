const express = require('express');
const puppeteer = require('puppeteer-core');

const app = express();
const PORT = process.env.PORT || 3000;

const CHROME_PATH = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium';

app.get('/scrape', async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Missing url parameter');
  }

  try {
    const browser = await puppeteer.launch({
      executablePath: CHROME_PATH,
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle0', timeout: 60000 });

    const html = await page.content();
    await browser.close();

    res.send(html);
  } catch (error) {
    console.error('Scraping error:', error);
    res.status(500).send('Scraping failed');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
