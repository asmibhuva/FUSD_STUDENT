const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
    }),
  ],
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            exclude: [
              // \\ for Windows, / for macOS and Linux
              /node_modules[\\/]core-js/,
              /node_modules[\\/]webpack[\\/]buildin/,
            ],
          }
        }
      },
      {
        test: /\.(scss)$/,
        use: [{
          // inject CSS to page
          loader: 'style-loader'
        }, {
          // translates CSS into CommonJS modules
          loader: 'css-loader'
        }, {
          // compiles Sass to CSS
          loader: 'sass-loader'
        }]
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },
};