const uuid = require('node-uuid');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// 判断用户输入的是那种账号 - 获取用户头像
let judgeNumsImg = (nums) => {
    if(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(nums)==true){
        return sql = `SELECT img FROM users WHERE userMail=?`;
    }else if(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|195)[0-9]{8}$/.test(nums)==true){
        return sql =  `SELECT img FROM users WHERE userPhone=?`;
    }else{
        return sql = `SELECT img FROM users WHERE uid=?`;
    }
}

// 判断用户输入的是那种账号 - 登录
let judgeNumsUser = (nums) => {
    if(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(nums)==true){
        return sql = `SELECT * FROM users WHERE userMail=? AND userPwd=?`;
    }else if(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|195)[0-9]{8}$/.test(nums)==true){
        return sql =  `SELECT * FROM users WHERE userPhone=? AND userPwd=?`;
    }else{
        return sql = `SELECT * FROM users WHERE uid=? AND userPwd=?`;
    }
}

// 判断用户输入的是那种账号 - 找回
let judgeNumsFind = (nums) => {
    if(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(nums)==true){
        return sql = `UPDATE users SET userPwd=? WHERE userMail=?`;
    }else if(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|195)[0-9]{8}$/.test(nums)==true){
        return sql =  `UPDATE users SET userPwd=? WHERE userPhone=?`;
    }
}

// 用户注册时生成account
let createAccount = () => {
    let session = uuid.v1();
    let account = session.replace(/\-/g,''); 
    return account;
}

// 数据加密
let hmac = (data) => {
    let hmac = (crypto.createHmac('md5','CPTYUNPIC')).update(data).digest('base64');
    return hmac;
}

// 生成token
let createToken = (content) => {
    let token = jwt.sign(content, 'CPTYUN');
    return token;
}

// 生成邮箱验证码
let createMailCode = () => {
    let str = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    let arr = '';
    for(let i = 0;i < 6;i++){
        arr += str.charAt(Math.random() * str.length | 0);
    }
    return arr;
}

// 生成手机验证码
let createPhoneCode = () => {
    let str = '1234567890';
    let arr = '';
    for(let i = 0;i < 6;i++){
        arr += str.charAt(Math.random() * str.length | 0);
    }
    return arr;
}

// 判断调用短信接口用途
let judgeSmsWay = (type) => {
    if(type=='1'){
        // 普通业务
        return templateId = '776359';
    }else if(type=='2'){
        // 短信登录
        return templateId = '828280';
    }else if(type=='3'){
        // 修改密码
        return templateId = '828281';
    }else if(type=='4'){
        // 新用户注册
        return templateId = '828382';
    }
}

// 判断调用邮箱用途
let judgeMailWay = (type) => {
    if(type=='1'){
        return html = `<div style='width:600px;margin:30px auto'><h1 style='text-align:center'>本次验证码如下</h1><strong style='font-size:20px;display:block;text-align:center;color:red'>${plug.createMailCode}</strong><p>验证码十分钟内有效，请及时输入</p><i style='color:#00bfff'>您正在注册网站会员，如果这不是您的操作请忽略该邮件。</i><p style='text-align:right'>--南小濡的技术窝</p></div>`;
    }else if(type=='2'){
        return html = `<div style='width:600px;margin:30px auto'><h1 style='text-align:center'>本次验证码如下</h1><strong style='font-size:20px;display:block;text-align:center;color:red'>${plug.createMailCode}</strong><p>验证码十分钟内有效，请及时输入</p><i style='color:#00bfff'>您正在进行修改密码,如不是您本人操作也无需担心，没有此验证码无法修改您的密码</i><p style='text-align:right'>--南小濡的技术窝</p></div>`
    }else if(type=='3'){
        return html = `<div style='width:600px;margin:30px auto'><h1 style='text-align:center'>用户封禁通知</h1><p style='color:#000'>非常抱歉的通知您，因您在留言区发布违规/辱骂/涉政等言论，您的账号已被永久封禁。</p><p style='text-align:right'>--南小濡的技术窝</p></div>`;
    }
}

module.exports = {
    judgeNumsImg,
    judgeNumsUser,
    judgeNumsFind,
    createAccount,
    hmac,
    createToken,
    createMailCode,
    createPhoneCode,
    judgeSmsWay,
    judgeMailWay
}