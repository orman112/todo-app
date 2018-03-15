var plugins = [];
const WebpackShellPlugin = require('webpack-shell-plugin');
const path = require('path');
 
plugins.push(new WebpackShellPlugin({
  onBuildStart: ['echo "Starting"'],
  onBuildEnd: ['nodemon server.js']
}));

var config = {
  
    entry: './public/src/main.js',
    output: {
      filename: './public/build/bundle.js'
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.js'
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader'
          ]
        }, {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
            }
            // other vue-loader options go here
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ]
    },
    devServer: {    
      contentBase: path.resolve(__dirname, 'public/src')
    },
    plugins: plugins,
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000
    }
  }

  module.exports = config;