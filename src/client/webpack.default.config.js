const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '../build-client');

module.exports = {
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'ts-loader',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=assets/[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            query: {
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
              },
              mozjpeg: {
                progressive: true,
                quality: 85
              },
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loaders: [
          'file-loader?name=assets/[hash].[ext]'
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  performance: {
    hints: false
  }
}