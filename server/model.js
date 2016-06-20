var db = require('./database');

db.set('a',{abc:1}).then(function () {
    return db.get('a')
}).then(function (res) {
    console.log(res);
})