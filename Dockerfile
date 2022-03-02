#FROM is the base image for which we will run our application
FROM node:16-alpine3.14

# Change working directory
WORKDIR /user/app

# Copy package.json into the container at /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at root level (in this case, /app directory)
COPY . ./

# Expose API port to the outside 
EXPOSE 8080

# Launch application
CMD ["npm", "run", "start"]