const sessionSecret = require('../config/session-secret');
const jwt = require('jsonwebtoken');
const Teacher=require('../models/teachermodel');

function ensureToken(req, res, next) {
    const token=req.cookies.token;
    if(!token){
        console.log("You need to login First")
        return res.redirect('/teacher/login');
    }
    jwt.verify(token,sessionSecret,(err,payload)=>{
        if(err){
            console.log("invalid token");
            return res.redirect("/teacher/login")
        }
        req.payload=payload;
        next();
    });
}
function ensureStToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        console.log("You need to login First");
        return res.redirect('/student/login');
    }
    jwt.verify(token, sessionSecret, (err, payload) => {
        if (err) {
            console.log("Invalid token");
            return res.redirect("/student/login");
        }
        req.payload = payload;
        next();
    });
}

module.exports = { ensureStToken };

function verifyRole(role) {
    return (req, res, next) => {
        jwt.verify(req.token, sessionSecret, (err, payload) => {
            if (err){ return res.sendStatus(403);}
            if (payload.role !== role) return res.sendStatus(401);
            next();
        });
    }
}

// const jwt = require('jsonwebtoken');

function checkRole(role) {
    return function (req, res, next) {
        const token = req.headers['authorization'];
        
        if (!token) {
            return res.status(403).send('Access denied. No token provided.');
        }
        try {
            const payload = jwt.verify(token, sessionSecret);
            console.log(payload);
            if (payload.role !== role) {
                return res.status(401).send('Not authorized.');
            }
            req.user = payload;
            next();
        } catch (ex) {
            res.status(400).send('Invalid token.');
        }
    };
}


module.exports = { ensureToken, verifyRole,ensureStToken ,checkRole};