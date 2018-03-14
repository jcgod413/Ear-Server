const apiDir = require('./api');
const publicDir = require('./public');
const express = require('express');

const router = express.Router();

router.use('/api', apiDir);
router.use('/public', publicDir);

module.exports = router;
