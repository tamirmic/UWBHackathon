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
    const { data } = await axios.get(yelpSearchUrl);

    const $ = cheerio.load(data);

    let firstResultLink = null;

    $('a.css-19v1rkv').each((i, elem) => {
      const link = $(elem).attr('href');
      if (link && link.startsWith('/biz/')) {
        firstResultLink = `https://www.yelp.com${link}`;
        return false; // Stop after finding the first valid link
      }
    });

    if (firstResultLink) {
      res.json({ url: firstResultLink });
    } else {
      res.status(404).send('No result found');
    }
  } catch (error) {
    console.error('Error scraping Yelp:', error.message);
    res.status(500).send('Server error while scraping Yelp');
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));