FROM node:18-alpine
# Set the working directory in the container
WORKDIR /app
# Install dependencies
COPY package.json .
# Copy package-lock.json
RUN npm install
# Install serve globally to serve the built application
RUN npm i -g serve
# Copy the rest of the application code
COPY . .
# Build the application
RUN npm run build
# Set the environment variable for production
EXPOSE 3000
# Set the command to run the app
CMD [ "serve", "-s", "dist" ]