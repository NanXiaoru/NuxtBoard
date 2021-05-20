// 处理用户头像
const formidable = require('formidable');

// 修改/上传头像
let uploadImg = (req,res) => {
    let form = new formidable.IncomingForm();
    form.uploadDir = './public/images/userImgs';
    form.keepExtensions = true;
    form.parse(req,function(err,fields,files){
        if(err) throw err;
        let arr = files.file.path.split("\\")
        req.session = `http://127.0.0.1:2345/${arr[0].replace("public/","")}`;
        res.cookie('name',req.session,{ maxAge: 3600000, path: '/register'});
        console.log(req.session)
        res.end();
    });
}

module.exports = {
    uploadImg
}