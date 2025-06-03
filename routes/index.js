const express = require("express");
const path = require('path');
const { nextTick } = require("process");
const { queryObjects } = require("v8");
const User = require("../models/user");


const router = express.Router();
let publicPath = path.join(__dirname, '..', 'public');

// Route to homepage
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/myteams', (req, res) => {
  res.render('teams');
});

router.get('/profile', async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    res.render('profile', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading profile');
  }
});


router.get('/edit-profile', (req, res) => {
  res.render('profileEdit');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register.ejs');
});


// update users theme

// router.post('/profile/update-theme', async (req, res) => {
//   const userId = req.user.user_id;
//   const { theme } = req.body;

//   if (!['light', 'dark'].includes(theme)) {
//     return res.status(400).json({error: 'INVALID theme value'});
//   }

//   try {
//     await user.updateProfile(userId, { theme_preference: theme });
//     res.status(200).json({ success: true });
//   } catch (err) {
//     console.error('Error updating theme:', err);
//     res.status(500).json({ error: 'Server error '});
//   }
// });
module.exports = router;
