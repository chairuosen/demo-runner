var db = require('./database');

function getHash(str) {
    return require('crypto').createHash('md5').update(str).digest("hex");
}

module.exports = {
    save:function (object) {
        var id = object.id || getHash(Math.random().toString());
        return db.set(id,object).then(function () {
            return id;
        });
    },
    get:function (id) {
        return db.get(id);
    }
}