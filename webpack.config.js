const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const IS_PROD = process.env.NODE_ENV === 'production';

const optimization = {
  minimize: IS_PROD,
  minimizer: [
    new TerserPlugin({
      extractComments: false,
      terserOptions: {
        ie8: false,
        ecma: 8,
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          drop_console: false
        },
        warnings: false,
        keep_classnames: true,
        keep_fnames: true
      }
    })
  ]
};

const rules = [{
  test: /\.(tsx?)$/,
  use: ['ts-loader']
}, {
  test: /\.(css)$/,
  use: ['style-loader', 'css-loader']
}, {
  test: /\.(glsl)$/,
  use: ['shader-loader']
}];

module.exports = {
  devServer: {
    hot: !IS_PROD,
    static: './static',
    host: '0.0.0.0'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: {
    'index': ['./src/server/index.ts']
  },
  output: {
    path: path.join(__dirname, './static'),
    publicPath: '/',
    filename: './[name].js',
    library: 'appLibrary',
    libraryTarget: 'umd',
    chunkFilename: './index.js',
    globalObject: 'this'
  },
  plugins: [],
  optimization,
  module: {
    rules
  },
  performance: {
    hints: false
  },
  devtool: false,
  mode: IS_PROD ? 'production' : 'development'
};
