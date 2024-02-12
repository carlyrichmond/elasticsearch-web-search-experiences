const elasticsearch = require("@elastic/elasticsearch");

const cloudID = process.env.ELASTIC_CLOUD_ID;
const apiKey = process.env.ELASTIC_API_KEY;
const index = 'movies-carly-richmond';

const client = new elasticsearch.Client({
  cloud: { id: cloudID },
  auth: { apiKey: apiKey },
});

async function getRecommendations(titleQuery, language) {
  if (!client) {
    return;
  }

  const query = {
    index: index,
    query: {
      bool: {
        must: [
          {
            match: {
              title: titleQuery,
            },
          },
        ],
      },
    },
  };

  if (language) {
    query.query.bool.must.push({ match: { original_language: language } });
  }

  return client.search(query);
}

module.exports = { getRecommendations };
