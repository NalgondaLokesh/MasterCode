
const express = require('express');
const router = express.Router();
const {
  getSnippets,
  getSnippet,
  createSnippet,
  updateSnippet,
  deleteSnippet,
  getUserSnippets,
} = require('../controllers/snippets');
const { protect } = require('../middleware/auth');

// Must put specific routes before parameterized routes
router.route('/me').get(protect, getUserSnippets);

router.route('/').get(getSnippets).post(protect, createSnippet);
router
  .route('/:id')
  .get(getSnippet)
  .put(protect, updateSnippet)
  .delete(protect, deleteSnippet);

module.exports = router;
