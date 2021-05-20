const db = require("../../config/db.config");
const plug = require('../public/middlePlug'); 

// 校验用户信息
let checkUserInfo = (req,res) => {
    let userSESSDATE = req.body.SESSDATE;
    let userCSRF = req.body.CSRF;
    let userCSRF_TOKEN = req.body.CSRF_TOKEN;
    let sql = `SELECT SESSDATE,CSRF,CSRF_TOKEN FROM users WHERE uid=?`;
    let sqlArr = [req.body.uuid];
    let callBack = (err, result) =>{
        if(err){
            throw err;
        }else{ 
            if(userSESSDATE!=result[0].SESSDATE || userCSRF!=result[0].CSRF || userCSRF_TOKEN!=result[0].CSRF_TOKEN){
                res.cookie('SESSDATE','',{ maxAge: -604800000 });
                res.cookie('CSRF','',{ maxAge: -604800000 });
                res.cookie('CSRF_TOKEN','',{ maxAge: -604800000 });
                res.cookie('uuid','',{ maxAge: -604800000 });
                res.send(
                    {
                        "status": 400,
                        "success": true,
                        "data": {
                            "code": 400,
                            "msg": "认证失败，请重新登录"
                        }
                    }
                )
            }else{
                // 即使认证成功数据库凭证也不予续期
                res.send(
                    {
                        "status": 200,
                        "success": true,
                        "data": {
                            "code": 200,
                            "msg": "认证成功"
                        }
                    }
                )
            }
        }
    }
    db.sqlConnect(sql, sqlArr, callBack);
}

/**
 * 密码登录
 */

// 1.获取凭证
let getCertificate = (req,res) => {
    let userNum = req.body.userNum;
    let userPwd = req.body.userPwd;
    // 后端防空
    if(userNum=='' || userNum==undefined || userPwd=='' || userPwd==undefined){
        res.send(
            {
                "status": 400,
                "success": false,
                "data": {
                    "code": 400,
                    "msg": "参数错误"
                }
            }
        )
    }else{
        let userPwd = plug.hmac(req.body.userPwd);
        let sql = plug.judgeNumsUser(req.body.userNum);
        let sqlArr = [req.body.userNum,userPwd];
        let callBack = (err, result) => {
            if (err) {
                throw err;
            } else {
                if(result==''){
                    res.send(
                        {
                            "status": 403,
                            "success": true,
                            "data": {
                                "code": 403,
                                "msg": "登陆失败，用户不存在或账号/密码错误" // 安全起见不提供具体登录失败原因
                            }
                        }
                    )
                }else{
                    if(result[0].CSRF=='' || result[0].CSRF==undefined || result[0].CSRF_TOKEN=='' || result[0].CSRF_TOKEN==undefined || result[0].SESSDATE=='' || result[0].SESSDATE==undefined){
                        let CSRF = plug.createAccount();
                        let CSRF_TOKEN = CSRF;
                        let content = CSRF+result[0].uid;
                        let SESSDATE = plug.createToken(content);
                        let uuid = result[0].uid;
                        let sql = `UPDATE users SET CSRF=?,CSRF_TOKEN=?,SESSDATE=? WHERE uid=?`;
                        let sqlArr = [CSRF,CSRF_TOKEN,SESSDATE,result[0].uid];
                        let callBack = (err, result) => {
                            if(err){
                                throw err;
                            }else{
                                console.log(uuid)
                                res.cookie('CSRF',CSRF,{ maxAge: 604800000 });
                                res.cookie('CSRF_TOKEN',CSRF_TOKEN,{ maxAge: 604800000 });
                                res.cookie('SESSDATE',SESSDATE,{ maxAge: 604800000 });
                                res.cookie('uuid',uuid,{ maxAge: 604800000 });
                                res.send(
                                    {
                                        "status": 200,
                                        "success": true,
                                        "data": {
                                            "code": 200,
                                            "msg": "登录成功"
                                        }
                                    }
                                )
                            }
                        }
                        db.sqlConnect(sql, sqlArr, callBack);
                    }else{
                        let uuid = result[0].uid;
                        let sql = `SELECT CSRF,CSRF_TOKEN,SESSDATE FROM users WHERE uid=?`;
                        let sqlArr = [result[0].uid];
                        let callBack = (err, result) => {
                            if(err){
                                throw err;
                            }else{
                                res.cookie('CSRF',result[0].CSRF,{ maxAge: 604800000 });
                                res.cookie('CSRF_TOKEN',result[0].CSRF_TOKEN,{ maxAge: 604800000 });
                                res.cookie('SESSDATE',result[0].SESSDATE,{ maxAge: 604800000 });
                                res.cookie('uuid',uuid,{ maxAge: 604800000 })
                                res.send(
                                    {
                                        "status": 200,
                                        "success": true,
                                        "data": {
                                            "code": 200,
                                            "msg": "登录成功"
                                        }
                                    }
                                )
                            }
                        }
                        db.sqlConnect(sql, sqlArr, callBack);
                    }
                }
            }
        }
        db.sqlConnect(sql, sqlArr, callBack);
    }
}

// 获取CSRF,CSRF_TOKEN.SESSDATE完成后获取用户信息
let getUserInfo = (req,res) => {
    let CSRF = req.body.CSRF;
    let CSRF_TOKEN = req.body.CSRF_TOKEN;
    let SESSDATE = req.body.SESSDATE;
    if(CSRF=='' || CSRF==undefined || CSRF_TOKEN=='' || CSRF_TOKEN==undefined || SESSDATE=='' || SESSDATE==undefined){
        res.send(
            {
                "status": 400,
                "success": false,
                "data": {
                    "code": 400,
                    "msg": "参数错误"
                }
            }
        )
    }else{
        let sql = `SELECT * FROM users WHERE CSRF=? AND CSRF_TOKEN=? AND SESSDATE=?`;
        let sqlArr = [CSRF,CSRF_TOKEN,SESSDATE];
        let callBack = (err, result) => {
            if(err){
                throw err;
            }else{
                res.cookie('userName',result[0].userName,{ maxAge: 604800000 });
                res.cookie('userImg',result[0].userImg,{ maxAge: 604800000 });
                res.send(
                    {
                        "status": 200,
                        "success": true,
                        "data": {
                            "code": 200
                        }
                    }
                )
            }
        }
        db.sqlConnect(sql, sqlArr, callBack);
    }
}

// 微信公众号扫码登录
let QRLogin = (req,res) => {}

// 注册
let register = (req,res) => {
    let userName = req.body.userName;
    let userPhone = req.body.userPhone;
    let userPwd = req.body.userPwd;
    let userImg = req.body.userImg;
    if(userName=='' || userName==undefined || userPhone=='' || userPhone==undefined || userPwd=='' || userPwd==undefined || userImg=='' || userImg==undefined){
        res.send(
            {
                "status": 400,
                "success": false,
                "data": {
                    "code": 400,
                    "msg": "参数错误"
                }
            }
        )
        return;
    }else{
        let userPwd = plug.hmac(req.body.userPwd);
        let sql = `INSERT INTO users(userName,userPhone,userPwd,userImg) VALUES (?,?,?,?)`;
        let sqlArr = [userName,userPhone,userPwd,userImg];
        let callBack = (err, result) => {
            if (err) {
                throw err;
            } else {
                res.send(
                    {
                        "status": 200,
                        "success": true,
                        "data": {
                            "code": 200,
                            "msg": "注册成功"
                        }
                    }
                )
            }
        }
        db.sqlConnect(sql, sqlArr, callBack);
    }
}

module.exports = {
    checkUserInfo,
    getCertificate,
    getUserInfo,
    QRLogin,
    register
}