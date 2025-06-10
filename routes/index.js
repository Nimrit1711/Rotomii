const express = require("express");
const path = require('path');
const { nextTick } = require("process");
const { queryObjects } = require("v8");
const User = require("../models/user");
const multer = require('multer');
const { isAuthenticated } = require("../middleware/auth");


const router = express.Router();
let publicPath = path.join(__dirname, '..', 'public');


// avatar image file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/avatars');
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar-${req.user.user_id}${ext}`);
  }
});
const upload = multer({ storage });

// Route to homepage
router.get('/', (req, res) => {
  res.render('home');
});

router.get('/search', isAuthenticated, (req, res) => {
  try {
    res.render('search', { user: req.user });
  } catch (err) {
    console.error(err);
  }

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

// edit profile page
router.get('/edit-profile', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.user.user_id);
    res.render('profileEdit', { user });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading profile');
  }

});

router.post('/profile', isAuthenticated, upload.single('avatar'), async (req,res) => {
  try {
    const userId = req.user.user_id;
    const {
 username, address, password, confirmedPassword
} = req.body;

    const updates = {};
    if (username) {
      updates.username = username;
    }
    if (req.file) {
      updates.avatar_image = `/images/avatars/${req.file.filename}`;
    }

      console.log(req.file, req.body);

    if (address){
      updates.address = address;
    }

    if (password && confirmedPassword && password === confirmedPassword){
      await User.changePassword(userId, password);
    }




    const success = await User.updateProfile(userId, updates);
    if (success){
      res.redirect('/profile');
    } else {
      res.status(400).send('No valid updates provided');
    }

  } catch (err){
    console.error(err);
    res.status(500).send('Error updating profile');
  }
});



router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register.ejs');
});




module.exports = router;
