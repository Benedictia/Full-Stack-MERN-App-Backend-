const express = require('express');
const axios = require('axios');
const Article = require('../models/Article');
const router = express.Router();
const articleRoutes = require('../routes/articleRoutes');
const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${"NEWS_API_KEY"}`;

router.get('/fetch-news', async (req, res) => {
  try {
    const response = await axios.get(NEWS_API_URL);
    const articles = response.data.articles;

    // Save articles to MongoDB
    await Article.insertMany(
      articles.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        
      }))
    );

    res.status(200).json({ message: 'News articles fetched and saved' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});

// Create a new article 
router.post('/articles', async (req, res) => {
  const { title, description, url, source, publishedAt } = req.body;

  try {
    const newArticle = new Article({
      title,
      description,
      url,
      source,
      publishedAt,
    });

    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all articles 
router.get('/articles', async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});


// Get article by ID 
router.get('/articles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const article = await Article.findById(id);

    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Update an article 
router.put('/articles/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, url, source, publishedAt } = req.body;

  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      id,
      { title, description, url, source, publishedAt },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete an article 
router.delete('/articles/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedArticle = await Article.findByIdAndDelete(id);

    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }

    res.status(200).json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

module.exports = router;
