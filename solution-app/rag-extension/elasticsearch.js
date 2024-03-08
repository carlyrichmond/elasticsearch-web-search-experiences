const elasticsearch = require("@elastic/elasticsearch");

const openai = require("@langchain/openai");
const prompts = require("@langchain/core/prompts");

const cloudID = process.env.ELASTIC_CLOUD_ID;
const apiKey = process.env.ELASTIC_API_KEY;
const index = "vector-movies-carly-richmond";

const client = new elasticsearch.Client({
  cloud: { id: cloudID },
  auth: { apiKey: apiKey },
});

const chatModel = new openai.ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

async function getDocumentsForQuery(titleQuery, language) {
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
      field: "embedding",
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

async function getRecommendations(titleQuery, language) {
  // Get documents from Elasticsearch
  const documents = await getDocumentsForQuery(titleQuery, language);

  // Create prompt template
  let template =
    "Create a movie review containing '{titleQuery}' of the following movie synopsis: {context}";

  if (language) {
    template = template + " in language {language}";
  }

  const promptTemplate = prompts.PromptTemplate.fromTemplate(template);

  // Format prompt with parameters and documents as context
  const formattedPrompt = await promptTemplate.format({
    titleQuery: titleQuery,
    language: language,
    context: documents.hits.hits[0]._source.overview,
  });

  // Get generated response
  const messages = await chatModel.invoke(formattedPrompt);

  return { featuredReview: messages.content, movies: documents };
}

module.exports = { getRecommendations };
