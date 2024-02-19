const elasticsearch = require("@elastic/elasticsearch");

const cloudID = process.env.ELASTIC_CLOUD_ID;
const apiKey = process.env.ELASTIC_API_KEY;
const index = "vector-movies-carly-richmond";

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
    knn: {
      field: "text_embedding.predicted_value",
      k: 10,
      num_candidates: 1000,
      query_vector_builder: {
        text_embedding: {
          model_id: "sentence-transformers__msmarco-minilm-l-12-v3",
          model_text: `Films similar to ${titleQuery}`,
        },
      },
    },
    rank: {
      rrf: {},
    },
  };

  if (language) {
    query.query.bool.must.push({ match: { original_language: language } });
  }

  return client.search(query);
}

module.exports = { getRecommendations };
