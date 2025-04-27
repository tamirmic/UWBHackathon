const express = require('express');
const cors = require('cors');
const fs = require('fs');
const ai_call = require("./ai_typefein")

const app = express();
app.use(cors());
app.use(express.json());

// Load businesses.json fully at startup
const businesses = JSON.parse(
  fs.readFileSync('./data/california_business.json', 'utf8')
);

// Load reviews.json fully at startup (for small testing file)
const reviews = JSON.parse(
  fs.readFileSync('./data/california_review.json', 'utf8')
);


app.post('/search', async (req, res) => {
  const { restaurant } = req.body;

  if (!restaurant) {
    return res.status(400).send('No restaurant name provided');
  }

  // Find business that matches restaurant name (case-insensitive)
  const business = businesses.find(b =>
    b.name.toLowerCase().includes(restaurant.toLowerCase())
  );

  if (!business) {
    return res.status(404).send('Restaurant not found');
  }

  // Find reviews for that business_id
  const matchedReviews = reviews
    .filter(r => r.business_id === business.business_id)
    .map(r => r.text);


  if (matchedReviews.length === 0) {
    return res.status(404).send('No reviews found for this restaurant');
  }
  const review_Batch = matchedReviews.slice(0, 100000);

  const summary = await ai_call.geminiResponse(review_Batch)

  // Return name and first 20 reviews
  res.json({
    name: business.name,
    reviews: summary
  });
});

// Start the server
const PORT = 5050;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
