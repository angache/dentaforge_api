const express = require('express');
const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);
router.get('/post', feedController.createPost);
module.exports = router;