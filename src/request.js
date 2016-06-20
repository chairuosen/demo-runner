var $ = require('jquery');
var Promise = require('bluebird');
var config = require('./config');

config.backend = config.backend.replace('localhost',window.location.host.split(':')[0]);

module.exports = {
    get:function (url,data) {
        return $.get(config.backend+url,data)
    },
    post:function (url,data) {
        return new Promise(function (resolve,reject) {
            $.ajax({
                url:config.backend+url,
                data:JSON.stringify(data),
                type:"POST",
                contentType : 'application/json; charset=UTF-8',
                success:function (res) {
                    resolve(res);
                },
                error:function (err) {
                    reject(new Error(err.responseText));
                },
                dataType:'json'
            });
        })
    }
};