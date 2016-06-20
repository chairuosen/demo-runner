var sqlite3 = require('sqlite3').verbose();
var Promise = require("bluebird");

var memDatabase = ":memory:";
var fileDatabase = '../database/database.db';

var tableName = "test";


var dbInstance;

function getInstance() {
    return new Promise(function (resolve,reject) {
        if(dbInstance){
            resolve(dbInstance);
        }else{
            dbInstance = new sqlite3.Database(fileDatabase,function(err) {
                if(err) reject(err);
                resolve(dbInstance);
            });
        }
    })
}

function dbFunctionWrap(name) {
    return function(){
        var args = Array.prototype.slice.call(arguments);
        return new Promise(function (resolve,reject) {
            dbInstance[name].apply(dbInstance,args.concat([function (err,data) {
                if(err) {
                    console.error(err);
                    reject(err);
                }
                resolve(data);
            }]));
        })
    }
}

function handlerWrap(name) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        return getInstance().then(function () {
            return dbFunctionWrap(name).apply(null,args);
        })
    }
}

var db = {
    serialize:function () {
        return getInstance().then(function (db) {
            return new Promise(function (resolve) {
                db.serialize(resolve);
            })
        })
    }
};

['run','get','all','each','exec','prepare','close'].forEach(function (name) {
    db[name] = handlerWrap(name);
});


function showTable() {
    var tables = [];
    return db.each("select * from sqlite_master where type='table'",function (err,table) {
        tables.push(table);
    }).then(function () {
        return tables
    })
}
function logTable() {
    var arr = [];
    return db.each('SELECT * FROM '+tableName+'',function (err,res) {
        arr.push(res);
    }).then(function () {
        console.log(arr);
        return arr;
    });
}

function tableExists(name) {
    return showTable().then(function (tables) {
        return tables.filter(function (table) {
                return table.name == name;
            }).length > 0;
    })
}

function createTable(){
    return tableExists(tableName).then(function (exists) {
        if(!exists){
            return db.run("CREATE TABLE "+tableName+"(k TEXT PRIMARY KEY, v TEXT)");
        }
        return;
    });
}

function set(k,v){
    var insertSQL = "INSERT INTO "+tableName+"(k, v) VALUES('"+k+"', '"+v+"')";
    var updateSQL = "UPDATE "+tableName+" SET v = '"+v+"' WHERE k = '"+k+"'";
    return initPromise.then(function () {
        return get(k);
    }).then(function (data) {
        if(data){
            return db.run(updateSQL);
        }else{
            return db.run(insertSQL);
        }
    });
}

function get(k) {
    return initPromise.then(function () {
        var sql = "SELECT * FROM "+tableName+" WHERE k = '"+k+"'";
        return db.get(sql).then(function (res) {
            return res && res.v;
        });
    });
}

var initPromise = createTable();

module.exports = {
    set:function (k,v) {
        return set(k,JSON.stringify({v:v}));
    },
    get:function (k) {
        return get(k).then(function (v) {
            return v && JSON.parse(v).v;
        })
    }
};