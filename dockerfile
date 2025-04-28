# official Node.js image
FROM node:20

# Create app directory
WORKDIR /app

# Install app dependencies separately
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

# Build the app (if needed — not needed for pure Express app usually)
# RUN npm run build

# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]