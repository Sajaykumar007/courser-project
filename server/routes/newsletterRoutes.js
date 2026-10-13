
const express = require('express');
const router = express.Router();

const {
  subscribeNewsletter,
  getAllSubscribers,
  toggleSubscription,
  deleteSubscriber
} = require('../controllers/newsletterController');

const adminAuth = require('../middleware/adminAuth');

// PUBLIC - Newsletter subscription
router.post('/subscribe', subscribeNewsletter);

// ADMIN ONLY - View subscribers
router.get('/all', adminAuth, getAllSubscribers);

// ADMIN ONLY - Toggle subscription status
router.put('/:id/toggle', adminAuth, toggleSubscription);

// ADMIN ONLY - Delete subscriber
router.delete('/:id', adminAuth, deleteSubscriber);

module.exports = router;
