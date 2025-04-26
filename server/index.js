const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Route to handle search request
app.post('/search', async (req, res) => {
  const { restaurant } = req.body;

  if (!restaurant) {
    return res.status(400).send('No restaurant name provided');
  }

  try {
    const yelpSearchUrl = `https://www.yelp.com/search?find_desc=${encodeURIComponent(restaurant)}`;
    const { data } = await axios.get(yelpSearchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
      }
    });

    const $ = cheerio.load(data);

    let firstResultLink = null;

    $('a.css-19v1rkv').each((i, elem) => {
      const link = $(elem).attr('href');
      if (link && link.startsWith('/biz/')) {
        firstResultLink = `https://www.yelp.com${link}`;
        return false;
      }
    });

    if (firstResultLink) {
      res.json({ url: firstResultLink });
    } else {
      res.status(404).send('No result found');
    }
  } catch (error) {
    console.error('Error scraping Yelp:', error.message);
  
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      console.error('Data:', error.response.data);
    }
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));