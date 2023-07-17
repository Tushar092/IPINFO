const express = require("express");
const auth = require("../middlewares/auth.middlewares");
const ipverify = require("../middlewares/ipauth.middlewares");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const ipRoute = express.Router();
const Redis = require("ioredis");

const redis = new Redis();

ipRoute.get("/info", auth, ipverify, (req, res) => {
    try {
        redis.get(`${req.body.ip}`, async (error, result) => {
            if (error) {
                console.log(error);
            } else {
                res.send(result.city);
            }

            const response = await fetch(`https://ipapi.co/${req.body.ip}/city/`, {
                method: "GET"
            });
            const body = await response.text();
            redis.set(`${req.body.ip}`, body.city);
            res.send(body.city);
        })
    } catch (error) {
        res.status(200).json({ "error": error.message });
    }
});

module.exports = ipRoute;