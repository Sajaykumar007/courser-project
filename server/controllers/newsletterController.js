const NewsletterSubscriber = require('../models/NewsletterSubscriber');

// Subscribe to newsletter
exports.subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Check if already exists
    const existingSubscriber = await NewsletterSubscriber.findOne({ email: trimmedEmail });
    if (existingSubscriber) {
      if (existingSubscriber.subscribed) {
        return res.status(409).json({ success: false, message: 'This email is already subscribed.' });
      } else {
        // Reactivate subscription if previously unsubscribed
        existingSubscriber.subscribed = true;
        await existingSubscriber.save();
        return res.status(200).json({ success: true, message: 'Successfully resubscribed to Courser updates!' });
      }
    }

    // Create new subscriber
    const newSubscriber = new NewsletterSubscriber({ email: trimmedEmail });
    await newSubscriber.save();

    res.status(201).json({ success: true, message: 'Successfully subscribed to Courser updates!' });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Get all subscribers (for Admin Dashboard)
exports.getAllSubscribers = async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }

    const subscribers = await NewsletterSubscriber.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: subscribers });
  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Toggle subscription status
exports.toggleSubscription = async (req, res) => {
  try {
    const subscriber = await NewsletterSubscriber.findById(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }
    subscriber.subscribed = !subscriber.subscribed;
    await subscriber.save();
    res.status(200).json({ success: true, message: 'Subscription status updated', data: subscriber });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete subscriber
exports.deleteSubscriber = async (req, res) => {
  try {
    await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};