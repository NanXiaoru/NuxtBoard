const db = require("../../config/db.config");

// 检测昵称是否被占用
let checkName = (req,res) => {
    let userName = req.body.userName;
    let sql = `SELECT userName FROM users WHERE userName=?`;
    let sqlArr = [userName];
    let callBack = (err, result) => {
        if(err){
            throw err;
        }else{
            if(result==''){
                res.send(
                    {
                        "status": 200,
                        "success": true,
                        "data": {
                            "code": 200,
                            "msg": "可以使用的昵称"
                        }
                    }
                )
            }else{
                res.send(
                    {
                        "status": 400,
                        "success": true,
                        "data": {
                            "code": 400,
                            "msg": "该昵称已被占用，换一个试试吧"
                        }
                    }
                )   
            }
        }
    }
    db.sqlConnect(sql, sqlArr, callBack);
}

// 检测手机号是否被占用
let checkPhone = (req,res) => {
    let userPhone = req.body.userPhone;
    if(/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(userPhone)==false){
        res.send(
            {
                "status": 403,
                "success": false,
                "data": {
                    "code": 403,
                    "msg": "参数错误"
                }
            }
        )
    }else{
        let sql = `SELECT userPhone FROM users WHERE userPhone=?`;
        let sqlArr = [userPhone];
        let callBack = (err, result) => {
            if(err){
                throw err;
            }else{
                if(result==''){
                    res.send(
                        {
                            "status": 200,
                            "success": true,
                            "data": {
                                "code": 200,
                                "msg": "该手机号尚未注册"
                            }
                        }
                    )
                }else{
                    res.send(
                        {
                            "status": 400,
                            "success": true,
                            "data": {
                                "code": 400,
                                "msg": "该手机号尚已注册，换一个试试吧"
                            }
                        }
                    )   
                }
            }
        }
        db.sqlConnect(sql, sqlArr, callBack);
    }
}

module.exports = {
    checkName,
    checkPhone
}