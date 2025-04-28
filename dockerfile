# Base Node.js image
FROM node:20

# Create app directory
WORKDIR /app

# Only copy package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies INSIDE Docker
RUN npm install --production

# Now copy rest of the source code
COPY . .

# RUN npm run build

# create uploads directory into public folder
RUN mkdir -p public/uploads
# Expose app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
