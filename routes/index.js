const express = require("express");
const path = require('path');

const router = express.Router();
let publicPath = path.join(__dirname, '..', 'public');

// Route to homepage
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/myteams', (req, res) => {
  res.render('teams');
});

router.get('/profile', (req, res) => {
  res.render('profile');
});

router.get('/myboxes', (req, res) => {
  res.render('boxes');
});

router.get('/registration', (req, res) => {
  res.render('registration');
});

module.exports = router;
