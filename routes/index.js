const express = require("express");
const path = require('path');

const router = express.Router();
let publicPath = path.join(__dirname, '..', 'public');

// Route to homepage
router.get('/', (req, res) => {
  res.sendFile(`${publicPath}/home.html`);

});
module.exports = router;
