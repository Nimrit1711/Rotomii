var express = require('express');
var router = express.Router();
const User = require('../models/user');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Get all non-admin users - admin only
router.get('/non-admin', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.getNonAdminUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Delete a user - admin only
router.delete('/:userId', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    // Prevent admin from deleting themselves
    if (userId === req.user.user_id) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    // Check if user is trying to delete another admin
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (userToDelete.is_admin === 1) {
      return res.status(403).json({ error: 'Cannot delete another admin user' });
    }

    const success = await User.deleteUser(userId);
    if (success) {
      return res.json({ message: 'User deleted successfully' });
    }
    return res.status(404).json({ error: 'User not found' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
