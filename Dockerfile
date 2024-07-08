FROM node:20
WORKDIR /MOVIES
COPY . .
RUN npm install 
EXPOSE 3000
CMD ["npm","start"]