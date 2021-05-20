const express = require('express');
const router = express.Router();

/* GET home page. /api/v1跳转cptyun.com */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * 服务器无数据响应
 * Have been abandoned
 */

// 服务器响应状态
// Have been abandoned



/**
 * 用户通知
 * Have been abandoned
 */
//  const mail = require('../modules/public/mail');

// 向用户发送邮件
// Have been abandoned
// router.post('/postMail',mail.postMail);

/**
 * 留言板操作
 */
const board = require('../modules/board/board');

// 获取所有留言
router.get('/getAllMsg',board.getAllMsg);

// 新增一条留言
router.post('/newMsg',board.newMsg);

// 删除一条留言
router.delete('/delMsg',board.delMsg);


/**
 * 用户头像操作
 */
const img = require('../modules/user/img');

router.post('/uploadImg',img.uploadImg);

/**
 * 检测用户信息
 */
const msg = require('../modules/user/msg');

// 检测昵称是否可用
router.post('/checkName',msg.checkName);

// 检测手机号是否可用
router.post('/checkPhone',msg.checkPhone);

/**
 * 用户操作
 */
 const user = require('../modules/user/user');

// 校验用户登录信息
router.post('/checkUserInfo',user.checkUserInfo);

/**
 * 密码登录
 */
// 1. 获取凭证
router.post('/getCertificate',user.getCertificate);
// 2. 获取信息
router.post('/getUserInfo',user.getUserInfo);

// 二维码登录
// Without the operating
// router.post('/QRLogin',user.QRLogin);

// 注册
router.post('/register',user.register);

module.exports = router;
