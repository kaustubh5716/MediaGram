const express = require('express');
const router = express.Router();
const Article = require('../model/articleSchema.js');

// Get all articles
router.get('/', async (req, res) => {
	try {
		const articles = await Article.find();
		res.json(articles);
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
});

// Get a specific article
router.get('/:id', async (req, res) => {
	try {
		const article = await Article.findById(req.params.id);
		if (article == null) {
			return res.status(404).json({
				message: 'Article not found'
			});
		}
		res.json(article)
	} catch (err) {
		return res.status(500).json({
			message: err.message
		});
	}
});

// Create an article
router.post('/', async (req, res) => {
	try {
		const article = new Article({
			title: req.body.title,
			author: req.body.author,
			content: req.body.content,
			category: req.body.category
		});

		const newArticle = await article.save();
		res.status(201).json(newArticle);
	} catch (err) {
		res.status(400).json({
			message: err.message
		});
	}
});

// Update an article
router.put('/:id', async (req, res) => {
	try {
		const article = await Article.findByIdAndUpdate(
			req.params.id, req.body, { new: true });
		if (!article) {
			return res.status(404).json({
				message: 'Article not found'
			});
		}
		res.json(article);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// Delete an article
router.delete('/:id', async (req, res) => {
	try {
		const article = await Article.findByIdAndDelete(req.params.id);
		if (!article) {
			return res.status(404).json({
				message: 'Article not found'
			});
		}
		res.json({ message: 'Article deleted' });
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
});

module.exports = router;
