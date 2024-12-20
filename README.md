The is is a Trending news application that fetches latest news from the news API using Express.js and MongoDB.
It implements CRUD funtionality
The database is connected using Mongoose

Here is the link to the backend : https://full-stack-mern-app-backend-2.onrender.com/api/articles
 Node.js, Express.js
Database: MongoDB (for CRUD functionality)
News API: Fetches trending news articles
To get trending news: GET /api/news

CRUD (Create, Read, Update, Delete) Functionality
Create News Article:
POST /api/articles

Read News Articles:
GET /api/articles

Update News Article:
PUT /api/articles/:id

Delete News Article:
DELETE /api/articles/:id



 Deployment
Push the code  to your GitHub repository.

Go to Render sign in or sign up.
Click on "New" and select "Web Service".
Choose your backend GitHub repository.
Set the build command to npm install and the start command to npm start.
Link your MongoDB database (you can use MongoDB Atlas or another MongoDB service).
Set environment variables: 
NEWS_API_KEY: Your News API key.
MONGO_URI: The connection string for your MongoDB database.
