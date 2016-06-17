var Vue = require('vue');
var jQuery = require('jquery');
window.$ = jQuery;
window.jQuery = jQuery;

var root = require('views/edit');
root.replace = false;
root.el = 'body';
new Vue(root);