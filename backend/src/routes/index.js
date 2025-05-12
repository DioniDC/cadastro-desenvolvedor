const express = require('express');
const router = express.Router();
const nivelRoutes = require('./niveis');
const devRoutes = require('./desenvolvedores');

router.use('/niveis', nivelRoutes);
router.use('/desenvolvedores', devRoutes);

module.exports = router;