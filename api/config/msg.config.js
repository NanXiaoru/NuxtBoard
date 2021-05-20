// Store the necessary business parameters

// Database parameters
let sqlAdd = '127.0.0.1';
let sqlPort = '3306';
let sqlUser = 'nanxiaoru';
let sqlPwd = '123456';
let sqlDatabase = 'board';

// Outgoing mailbox parameters
let mailAdd = '';
let mailUser = '';
let mailPwd = '';

// Qiniu cloud storage space parameters(Other storage space is also available)
let ACCESS_KEY = '';
let SECRET_KEY = '';
let bucket = '';

// Tencent cloud SMS parameters
let appid = '';
let appkey = '';
let secretId = '';
let secretKey = '';

module.exports = {
    sqlAdd,
    sqlPort,
    sqlUser,
    sqlPwd,
    sqlDatabase,
    mailAdd,
    mailUser,
    mailPwd,
    ACCESS_KEY,
    SECRET_KEY,
    bucket,
    appid,
    appkey,
    secretId,
    secretKey
}