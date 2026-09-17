const express = require('express');
const router = express.Router();
const { 
  subscribeNewsletter, 
  getAllSubscribers, 
  toggleSubscription, 
  deleteSubscriber 
} = require('../controllers/newsletterController');

router.post('/subscribe', subscribeNewsletter);
router.get('/all', getAllSubscribers);
router.put('/:id/toggle', toggleSubscription);
router.delete('/:id', deleteSubscriber);

module.exports = router;