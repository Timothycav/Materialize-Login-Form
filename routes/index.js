const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

// Index Page
router.get('/', (req, res) => res.render('/'));

// Welcome
router.get('/welcome', ensureAuthenticated, (req, res) =>
  res.render('welcome', {
    user: req.user
  })
);

module.exports = router;