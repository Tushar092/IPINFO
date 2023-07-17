const jwt = require("jsonwebtoken");
const Redis = require("ioredis");
const UserModel = require("../models/user.models");

const redis = new Redis();

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    let bltoken = "";
    redis.get(token)
    .then((result) => {
        bltoken = result;
      });
    if (token) {
        if (bltoken.length != 0) {
            res.status(200).json({ msg: "Please Login again!!" });
        }else{
            try {
                const decoded = jwt.verify(token, "IPINFO");
                let {userID} = decoded; 
                if (decoded) {
                    req.body.userID = decoded.userID;
                    req.body.user = decoded.user;
                    next();
                } else {
                    res.json({ msg: error.message });
                }
            } catch (error) {
                res.json({ msg: error.message });
            }
        }
    }else{
        res.json({msg: "Please Login!!"});
    }
}

module.exports = auth;