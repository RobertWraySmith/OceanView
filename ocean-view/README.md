# ocean-view
OceanView is a configurable photography viewer. It reads a galleries.json file from cloud storage and uses that to define a set of photograph galleries, eachwith its own catalog.

# It uses:
  node
  React v17.0
  Docker, to build deploy containers
  GCP (Google Cloud Platform) to deploy containers to the web

# To run development server
  npm start

favicon from https://favicon.io/favicon-generator
  Background: Rounded
  Font Family: Courgette
  Font Size: 110
  Font Color #DDD
  Background Color #0AA

Build docker image with:
  docker build --tag ocean-view .

Run docker container locally
  docker run --name ocean-view -d -p 80:8080 ocean-view

Deploy to GCP
  docker tag <DOCKER_IMAGE_ID> gcr.io/<GCP_PROJECT_ID>/ocean-view-nginx
  docker push gcr.io/<GCP_PROJECT_ID>/ocean-view-nginx:latest

  where, eg:
    DOCKER_IMAGE_ID:   91f87beb9727
    GCP_PROJECT_ID: oceanography-312604
