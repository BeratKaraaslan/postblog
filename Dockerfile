FROM node:18.12 as development

WORKDIR /Users/beratkaraaslan/Document/Projects/PostBlog/postblog/src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM node:18.12 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /Users/beratkaraaslan/Document/Projects/PostBlog/postblog/src

COPY --from=build /Users/beratkaraaslan/Document/Projects/PostBlog/postblog/dist ./dist

COPY package*.json ./

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3600

CMD ["node", "dist/main"]