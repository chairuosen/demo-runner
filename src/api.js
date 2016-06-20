var request = require('./request');
module.exports = {
    saveCode:function (object) {
        return request.post('/api/save',object);
    },
    getCode:function (id) {
        return request.get('/api/get',{id:id});
    }
};