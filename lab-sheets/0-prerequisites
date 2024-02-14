# Lab 0: Setup

So you want to build a web app with search? Brilliant, as this is exactly what this workshop is for! 

There are a couple of things you'll need before we start:

## 1. An Elastic cluster to store your documents and perform searches against. 

* For the codebar Festival Live workshop on 9th March 2024, I'll provide credentials to the cluster in the chat.*

For those following along after, please follow the below steps to create your own cluster using an Elastic free trial:

1. Create a trial account at [https://cloud.elastic.co/](https://cloud.elastic.co/) using the *Start free trial* button.
2. Add the basic settings for your new cluster:
    * Name your deployment something interesting.
    * Choose your preferred cloud provider (any is fine).
    * Choose your region, ideally one close to your physical location.
    * Keeping the *Hardware profile* as the default of *Storage optimized* is fine.
    * Keep *Version* as the latest.
3. Configure the advanced cluster settings:
    * Set zone availability on the *Hot tier* of Elasticsearch to 1 (you don't need to worry about data loss for our toy project).
    * Make sure you have autoscaling enabled on the *Machine Learning instances*.
    * Keep the default settings for Kibana (the UI and data visualization layer).
    * Remove the Integrations Server instances. These are used for application monitoring which is out of scope of today's workshop.
4. Hit the *Create deployment* button.
5. Take a note of your deployment credentials somewhere safe.
6. Navigate to your deployment once ready with the *Continue* button.

## 2. Installation of Node and npm

This project requires installation of [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) before starting. Both are essential for modern full-stack web development in JavaScript.

To check you have Node.js and npm installed, run the following commands:

```bash
node -v
npm -v
```

If you receive an error, [download and install Node.js and npm using these instructions](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm). [This blog also gives detailed steps on how to install using installers](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac).

## 3. Initialization of the starting point application:

To help you get started, a very simple web application is included in this repository under the `starting-app` folder. To initialize the application, please follow the below commands in a terminal to start the application. 

```bash
cd starting-app
npm install
node server
```

Please ensure that you are present in the top-level folder for this project when you start. These steps should be the same for Windows and Mac.

## 4. Import text embedding model from Hugging Face (optional)

*Note: this step is only needed if you have created your own cluster*

To generate the vectors for both our documents and queries, we need to use a machine learning model to generate the text embeddings. Although this can be achieved using the [inference endpoint exposed through the Huggingface.js API](https://huggingface.co/docs/huggingface.js/en/inference/README#feature-extraction), we are making use of model [`sentence-transformers/msmarco-MiniLM-L-12-v3`](https://huggingface.co/sentence-transformers/msmarco-MiniLM-L-12-v3) previously imported by the facilitator for ease.

This guide is based on the [How to deploy a text embedding model and use it for semantic search](https://www.elastic.co/guide/en/machine-learning/current/ml-nlp-text-emb-vector-search-example.html) from the Elastic documentation:

1. [Install Docker](https://docs.docker.com/get-docker/)
2. Open Docker on your machine
3. Via the command line terminal, pull the latest Docker image of [*Eland*, the Elastic Python machine learning client](https://www.elastic.co/guide/en/elasticsearch/client/eland/current):

```bash
docker pull docker.elastic.co/eland/eland
```

4. Define the `ELASTIC_CLOUD_ID` and `ELASTIC_API_KEY` values of your cluster as environment variables:

Linux/ Mac:
```bash
export ELASTIC_CLOUD_ID=MY_CLOUD_ID
export ELASTIC_API_KEY=MY-API-KEY
```

Windows:
```cmd
set ELASTIC_CLOUD_ID=MY_CLOUD_ID
set ELASTIC_API_KEY=MY-API-KEY
```

5. Install the model in your cluster:

```bash
docker run -it --rm elastic/eland \
    eland_import_hub_model \
      --cloud-id $ELASTIC_CLOUD_ID \
      --es-api-key $ELASTIC_API_KEY \
      --hub-model-id sentence-transformers/msmarco-MiniLM-L-12-v3 \
      --task-type text_embedding \
      --start
```

6. Once complete synchronize your models under the *Machine Learning > Trained Models* page.




