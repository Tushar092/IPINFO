const ipverify = (req, res, next) => {
    let { ip } = req.body;
    ip = ip.split(".").map(Number);
    ip.forEach(element => {
        if(element > 255){
            res.send("Invalid IP address");
        }else if(typeof(element) != Number){
            res.send("Invalid IP adress");
        }
    });
    next();
}

module.exports = ipverify;