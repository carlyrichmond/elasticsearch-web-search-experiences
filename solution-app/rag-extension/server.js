const express = require("express");
const cors = require("cors");
const path = require("path");

const { getRecommendations } = require("./elasticsearch");

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get("/recommendations", async (req, res) => {
  const titleQuery = req.query.query ? decodeURIComponent(req.query.query): '';
  const language = req.query.language !== 'all' ? decodeURIComponent(req.query.language): '';

  let recommendations = { featuredReview: 'No exciting films out right now', movies: [] };

  try {
    const response = await getRecommendations(titleQuery, language);
    recommendations = response.movies?.hits?.hits.map((hit) => {
      return hit._source;
    });

    const result = { featuredReview: response.featuredReview, movies: recommendations };
    res.send(result);
    
  } catch(e) {
    console.log(e);
    throw e;
  }

  res.send(recommendations);
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Recommending movies on port ${port}`);
});
