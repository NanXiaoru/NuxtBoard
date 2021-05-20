

let serverHeartBeat = (req,res) => {
    res.send(
        {
            "status": 200,
            "success": true,
            "data": {
                "code": 200,
                "msg": "OK"
            } 
        }
    )
} 

module.exports = {
    serverHeartBeat
}