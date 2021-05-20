const mysql = require('mysql');
const msg = require('./msg.config');

module.exports = {
    config: {
        host: msg.sqlAdd,
        port: msg.sqlPort,
        user: msg.sqlUser,
        password: msg.sqlPwd,
        database: msg.sqlDatabase
    },
    //连接池
    sqlConnect: function(sql,sqlArr,callBack){
        const pool = mysql.createPool(this.config)
        pool.getConnection((err,conn) => {
            if(err){
                return;
            }
            conn.query(sql,sqlArr,callBack);
            conn.release();
        })
    }
}