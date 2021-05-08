# Build react project, using node based image
# FROM node:alpine as build-stage
FROM node:12.18.2 as build

# Sett working dir inside container
WORKDIR /app

# Copy package info
COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

# Build the dependencies
RUN yarn install

# Copy the react app
COPY . .

# Build the production react app
RUN yarn build

# Production environment
# FROM nginx:stable-alpine
FROM nginx

# Copy the react app
COPY --from=build /app/build /usr/share/nginx/html

# Copy the nginx config file for this app, overwriting the default config
# COPY --from=build-stage /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=build-stage /app/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
