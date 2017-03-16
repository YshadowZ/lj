import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import buildConfig from './buildConfig';

const config = {
  entry: {
    a_lib: ['webpack/hot/dev-server', './lib.js'], // a or z 为了把js文件插入html时排序使用,lib为公用的库文件，以a开头，确保在最前面
    z_main: ['webpack/hot/dev-server', './main.js'], // main为业务逻辑文件，以z开头，确保在最后
    devServerClient: 'webpack-dev-server/client?http://0.0.0.0:8080/'
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'video-manager-[name].js',
    publicPath: buildConfig.dev.staticDomain
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel'
      },
      {
        test: /\.(scss|sass)$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('css-loader') // 单独抽出css文件插入html
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]'
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    quite: false,
    noInfo: false,
    stats: {
      assets: false,
      colors: true,
      version: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },
    contentBase: './dist',
    host: '0.0.0.0'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.html`,
      inject: 'body',
      filename: `${__dirname}/dist/index.html`,
      minify: false,
      cache: true,
      chunksSortMode: (a, b) => a.names[0] > b.names[0] // 给插入html中的js文件排序
    }),
    new ExtractTextPlugin('[name].css'), // 单独抽出css文件插入html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"dev"'
      }
    })
  ]
};

export default config;
