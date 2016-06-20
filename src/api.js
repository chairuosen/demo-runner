var request = require('./request');
var a = 1;
module.exports = {
    saveCode:function (object) {
        return request.post('/api/save',object);
    },
    getCode:function (id) {
        return request.get('/api/get',{id:id});
    }
};