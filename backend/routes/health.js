const r = require('express').Router();
r.get('/', (req,res)=> res.json({status:'ok', uptime: process.uptime()}));
module.exports = r;
