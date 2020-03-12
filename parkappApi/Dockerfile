FROM node:alpine3.10

# Create app directory
WORKDIR C:\Users\dmtroncoso\Desktop\mis-repositorios\express-mongoose\twheaterapp

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm install nodemon -g --quiet
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
# CMD [ "npm", "start" ]
# ENTRYPOINT nodemon -L --watch . app.js
ENTRYPOINT [ "npm", "start" ]