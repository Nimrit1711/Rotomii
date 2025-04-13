const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const path = require('path');

// Database connection function
async function getDb() {
  return open({
    filename: path.join(__dirname, '..', 'rotomii.db'),
    driver: sqlite3.Database
  });
}

module.exports = getDb;
