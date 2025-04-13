const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

// TODO: Implement Team management routes (Madeleine/Alex)
// - Create new team
// - Get user's teams
// - Get specific team details (with Pokemon)
// - Add/Remove Pokemon from team
// - Update team notes/name
// - Delete team
// - Maybe update Pokemon details within a team (nickname, notes)

router.get('/', isAuthenticated, (req, res) => {
  res.json({ message: "Get user's teams (Madeleine/Alex to implement)" });
});

router.post('/', isAuthenticated, (req, res) => {
  res.json({ message: 'Create new team (Madeleine/Alex to implement)' });
});

router.get('/:teamId', isAuthenticated, (req, res) => {
  res.json({ message: `Get team ${req.params.teamId} details (Madeleine/Alex to implement)` });
});

router.post('/:teamId/pokemon', isAuthenticated, (req, res) => {
    res.json({ message: `Add Pokemon to team ${req.params.teamId} (Madeleine/Alex to implement)` });
});

router.delete('/:teamId/pokemon/:position', isAuthenticated, (req, res) => {
    res.json({ message: `Remove Pokemon at position ${req.params.position} from team ${req.params.teamId} (Madeleine/Alex to implement)` });
});

// Add more routes for team modifications...

module.exports = router;
