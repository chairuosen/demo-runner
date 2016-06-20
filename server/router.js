var express = require('express');
var router = express.Router();
var model = require('./model');

router.post('/save',function (req,res) {
    model.save(req.body).then(function (id) {
        res.send({id:id});
    },function (err) {
        res.status(500).send(err);
    });
});

router.get('/get',function (req,res) {
    model.get(req.query.id).then(function (data) {
        res.send({data:data});
    },function (err) {
        res.status(500).send(err);
    });
});

module.exports = router;