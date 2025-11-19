// const express = require('express').Router();
const express = require('express');
const Quotes = require('../models/Quote');
const router = express.Router();

// Validation middleware
const validateQuote = (req, res, next) => {
  const { author, text } = req.body;
  
  if (!author || !author.trim()) {
    return res.status(400).json({ error: 'Author is required' });
  }
  
  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Quote text is required' });
  }
  
  if (author.trim().length < 2) {
    return res.status(400).json({ error: 'Author name must be at least 2 characters' });
  }
  
  if (text.trim().length < 5) {
    return res.status(400).json({ error: 'Quote text must be at least 5 characters' });
  }
  
  next();
};

router.get('/allQuotes', async (req, res) => {
  try {
    let allQuotes = await Quotes.find({}).sort({ createdAt: -1 });
    res.status(200).json(allQuotes);
  } catch (e) {
    console.error('Error fetching quotes:', e);
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

router.post('/addQuotes', validateQuote, async (req, res) => {
  try {
    let { author, text } = req.body;
    const newQuote = await Quotes.create({ 
      author: author.trim(), 
      text: text.trim() 
    });
    res.status(201).json({ 
      message: "Quote created successfully", 
      quote: newQuote 
    });
  } catch (e) {
    console.error('Error creating quote:', e);
    res.status(500).json({ error: 'Failed to create quote' });
  }
});

router.get('/quotes/:id', async (req, res) => {
  try {
    let { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid quote ID' });
    }
    
    let foundQuote = await Quotes.findById(id);
    
    if (!foundQuote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    
    res.status(200).json(foundQuote);
  } catch (e) {
    console.error('Error fetching quote:', e);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

module.exports = router;