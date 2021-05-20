const db = require('../../config/db.config');
const msg = require('../../config/msg.config');

/**
 * 读取所有留言
 * 无需参数
 */
let getAllMsg = (req,res) => {
    let sql = `SELECT * FROM boardmsg`;
    let sqlArr = [];
    let callBack = (err,result) => {
        if(err){ 
            throw err;
        }else{
            res.send(result)
        }
    }
    db.sqlConnect(sql, sqlArr, callBack);
}

/**
 * 新增一条留言
 * 参数:JSON:
 *      SESSDATE:string(必须);
 *      CSRF:string(必须);
 *      CSRF_TOKEN:string(必须);
 *      userName:string(必须);
 *      msg:string(必须);
 *      uuid:string(必须)
 *      createTime:time(无需)
 * 返回:JSON
 */
let newMsg = (req,res) => {
    checkCF = [req.body.SESSDATE,req.body.CSRF,req.body.CSRF_TOKEN,req.body.uuid]
    if(checkCF.indexOf('') > -1){
        res.send(
            {
                "status": 400,
                "success": false,
                "data": {
                    "code": 400,
                    "msg": "CSRF校验失败"
                }
            }
        )
    }else{
        let sql = `SELECT uid FROM users WHERE SESSDATE=? AND CSRF=? AND CSRF_TOKEN=?`;
        let sqlArr = [req.body.SESSDATE,req.body.CSRF,req.body.CSRF_TOKEN];
        let callBack = (err, result) => {
            if(err){
                throw err;
            }else{
                if(result==''){
                    res.send(
                        {
                            "status": 403,
                            "success": false,
                            "data": {
                                "code": 403,
                                "msg": "用户信息校验失败，请重新登录以尝试解决问题"
                            }
                        }
                    )
                }else if(result[0].uid==req.body.uuid){
                    let sql = `INSERT INTO boardmsg(uid,userName,userImg,msg) VALUES (?,?,?,?)`;
                    let sqlArr = [req.body.uuid,req.body.userName,req.body.userImg,req.body.msg];
                    let callBack = (err, result) =>{
                        if(err){
                            res.send(err);
                        }else{
                            res.send(
                                {
                                    "stutas": 200,
                                    "success": true,
                                    "data": {
                                        "code": 200,
                                        "msg": "操作成功"
                                    }
                                }
                            )
                        }
                    }
                    db.sqlConnect(sql, sqlArr, callBack);
                }else{
                    res.send(
                        {
                            "status": 403,
                            "success": false,
                            "data": {
                                "code": 403,
                                "msg": "服务器拒绝了您的请求，请重新登录或稍后再试"
                            }
                        }
                    )
                }
            }
        }
        db.sqlConnect(sql, sqlArr, callBack);
    }
}

/**
 * 删除一条留言
 * 参数:JSON:
 *      SESSDATE:string(必须);
 *      CSRF:string(必须);
 *      CSRF_TOKEN:string(必须);
 *      userName:string(必须);
 *      msg:string(必须);
 *      uuid:string(必须)
 * 返回:JSON
 */
 let delMsg = (req,res) => {}

module.exports = {
    getAllMsg,
    newMsg,
    delMsg
}