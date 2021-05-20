const express = require('express');
const router = express.Router();

/* GET home page. 根路径跳转cptyun.com */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

  module.exports = router;