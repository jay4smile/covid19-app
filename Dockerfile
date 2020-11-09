# stage1 as builder
FROM node:10-alpine as builder

#stage2
# copy the package.json to install dependencies
COPY package.json package-lock.json ./

# Install the dependencies and make the folder
RUN npm install && mkdir /covid19-ui && mv ./node_modules ./covid19-ui

WORKDIR /covid19-ui

COPY . .

# Build the project and copy the files
RUN npm run ng build


FROM nginx:1.16-alpine as production

#!/bin/sh


## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*


# Copy from the stahg 1
COPY --from=builder /covid19-ui/dist/covid19-app /usr/share/nginx/html

RUN chown nginx:nginx /usr/share/nginx/html/*

EXPOSE 80


ENTRYPOINT ["nginx", "-g", "daemon off;"]