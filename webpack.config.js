var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');


var htmlOption = {
    title:"Desktop Simulation"
}

module.exports = {
    resolve:{
        root:[path.join(__dirname,"client")]
    },
    entry:{
        'main':['./client/main.js']
    },
    output:{
        path:'./dist',
        publicPath:'./',
        filename:'[name].[hash].js'
    },
    module: {
        loaders: [
            {
                test: /\.less$/,
                loader: "style!css!less"
            },
            {
                test: /\.html$/,
                loader: "html"
            },
            {
                test: /\.vue$/,
                loader: "vue"
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    devtool:"cheap-module-source-map",
    plugins:[
        new HtmlWebpackPlugin(htmlOption)
    ]
}