const nodemailer = require('nodemailer');
const msg = require('../../config/msg.config');

const plug = require('./middlePlug'); 

let postMail = (req,res) => {
    let mailType = req.body.mailType;
    let userMail = req.body.userMail;
    if(mailType=='' || mailType==undefined || userMail=='' || userMail==undefined || (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(userMail))==false){
        res.send(
            {
                "status":-400,
                "success":false,
                "data":{
                    "msg":"参数错误"
                }
            }
        )
    }else{
        // Establish an SMTP connection
        let tranSports = nodemailer.createTransport({
            host : msg.mailAdd,
            secureConnection : false,
            auth: {
                user : msg.mailUser,
                pass : msg.mailPwd
            }
        })
        // Relevant parameter
        let options = {
            from : msg.mailUser,
            to : userMail,
            subject : '请接收您的验证码',
            // 这里可以写html格式
            html : `${plug.createMailCode}`,
        };
        tranSports.sendMail(options,(err,msg) => {
            if(err){
                console.log(err)
            }else{
                let obj = [{
                    "code":200,
                    "success":true,
                    "msg":"验证码已下发",
                    "data":{
                        "code":newCode
                    }
                }]
                res.send(obj)
                transporter.close();
            }
        })
        res.end();
    }
}

module.exports = {
    postMail
};