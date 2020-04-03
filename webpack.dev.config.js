var path = require('path')
var webpack = require('webpack')
// var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const extractPlugin = new ExtractTextPlugin({
	filename: "[name].css",
	disable: process.env.NODE_ENV === "development"
})

module.exports = {
  devtool: 'cheap-eval-source-map',
  entry: [
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    // loaders: [{
    //   test: /\.css$/,
    //   loaders: ['style', 'css']
    // }],
    rules: [
        {
            test: /\.js?$/,
            use: [
                {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015", "react"]
                    }
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
        {
            test: /\.scss$/,
            use: extractPlugin.extract({
                use: ["css-loader", "sass-loader"]
            })
        },
        {
            test: /\.(png|jpg|jpeg|gif|ico)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: 'img/',
                    name: '[name].[ext]',
                },
            }],
        },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist',
    hot: true
  },
  plugins: [
    new webpack.DefinePlugin({
        "process.env.NODE_ENV": '"production"'
    }),
    extractPlugin
  ]
}