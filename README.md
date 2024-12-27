# My-News-Aggregator: React Vite Application Documentation

## **Project Overview**
`My-News-Aggregator` is a frontend application built with React and Vite. It fetches articles from three different sources: **The Guardian**, **News API**, and **New York Times (NYT)**. The application is structured with modular components and styled using SCSS. This documentation explains how to run the project in a Docker container.

---

## **Project Directory Structure**
```
my-news-aggregator/
├── src/
│   ├── api/
│   │   ├── guardianAPI.js
│   │   ├── newsAPI.js
│   │   ├── nytAPI.js
│   ├── styles/
│   │   ├── global.scss
│   ├── components/
│   │   ├── LatestNews/
│   │   │   ├── LatestNews.jsx
│   │   │   ├── LatestNews.scss
│   │   ├── ArticleCard/
│   │   │   ├── ArticleCard.jsx
│   │   │   ├── ArticleCard.module.scss
│   │   ├── BreakingNewsSlider/
│   │   │   ├── BreakingNewsSlider.jsx
│   │   │   ├── BreakingNewsSlider.scss
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   ├── Header.module.scss
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   ├── Footer.module.scss
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.module.scss
│   │   ├── Preferences/
│   │   │   ├── Preferences.jsx
│   │   │   ├── Preferences.module.scss
│   ├── App.jsx
│   ├── main.jsx
├── Dockerfile
├── .dockerignore
├── package.json
├── vite.config.js
├── README.md
```

---

## **Steps to Run the Project in a Docker Container**

### **1. Prerequisites**
Before starting, ensure the following are installed:
- **Docker Desktop**: [Download and Install](https://www.docker.com/products/docker-desktop)
- **Git**: [Download Git](https://git-scm.com/)

---

### **2. Dockerfile**
The `Dockerfile` is used to build and run the application in a container. Below is the content:

```dockerfile
# Stage 1: Build the React Vite app
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built application using Nginx
FROM nginx:alpine

# Copy the built files from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
```

---

### **3. .dockerignore**
The `.dockerignore` file ensures unnecessary files are excluded from the Docker image. Below is its content:

```plaintext
node_modules
npm-debug.log
.env
.DS_Store
build
dist
Dockerfile
.dockerignore
coverage
```

---

### **4. Steps to Build and Run the Docker Container**

1. **Clone the Repository:**
   Clone the project from GitHub to your local machine:
   ```powershell
   git clone https://github.com/<your-username>/my-news-aggregator.git
   cd my-news-aggregator
   ```

2. **Build the Docker Image:**
   Use the following command to build the Docker image:
   ```powershell
   docker build -t my-news-aggregator .
   ```

3. **Run the Docker Container:**
   Start the container and map port 3000 of your machine to port 80 of the container:
   ```powershell
   docker run -p 3000:80 my-news-aggregator
   ```

4. **Access the Application:**
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

### **5. Explanation of API Integration**

The project fetches articles using APIs defined in the `src/api` folder:
- **`guardianAPI.js`**: Handles API calls to The Guardian.
- **`newsAPI.js`**: Manages API calls to News API.
- **`nytAPI.js`**: Fetches articles from The New York Times.

These APIs are called within components like `LatestNews` and `BreakingNewsSlider` to display dynamic news content.

---

### **6. Additional Notes**

- **Environment Variables:**
  - Ensure to configure your `.env` file with API keys for The Guardian, News API, and NYT.
  - Example:
    ```plaintext
    VITE_GUARDIAN_API_KEY=your_guardian_api_key
    VITE_NEWS_API_KEY=your_news_api_key
    VITE_NYT_API_KEY=your_nyt_api_key
    ```

- **SCSS Styling:**
  - Global styles are defined in `src/styles/global.scss`.
  - Component-specific styles are in their respective `.scss` or `.module.scss` files.

- **Build Output:**
  - Vite builds the project into the `dist` folder, which is served using Nginx in the Docker container.

---

### **7. Summary**
To run the project in a Docker container:
1. Clone the repository.
2. Build the Docker image using `docker build`.
3. Run the container using `docker run`.
4. Access the application at `http://localhost:3000`.

This documentation provides all necessary details to run and maintain the `My-News-Aggregator` application in a professional and containerized environment.
