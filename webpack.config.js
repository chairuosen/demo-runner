var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var argv = require('yargs').argv;

var uglyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

var htmlOption = {
    title:"Demo Runner"
}

module.exports = {
    resolve:{
        root:[path.join(__dirname,"src")],
        extensions:["",".js",".vue"]
    },
    entry:{
        'main':['./src/main.js']
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
        ],
        noParse:[
            path.join(__dirname,'node_modules','less')
        ]
    },
    plugins:[
        new HtmlWebpackPlugin(htmlOption)
    ]
};

if(argv.production){
    module.exports.plugins.push(uglyPlugin)
}