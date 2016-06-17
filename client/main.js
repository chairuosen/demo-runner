var Vue = require('vue');
var jQuery = require('jquery');
window.$ = jQuery;
window.jQuery = jQuery;
var root = require('views/root.vue');
root.el = 'body';
root.replace = false;
new Vue(root);