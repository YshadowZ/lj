import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import buildConfig from './buildConfig';

const config = {
  entry: {
    a_lib: './lib.js', // a or z 为了把js文件插入html时排序使用,lib为公用的库文件，以a开头，确保在最前面
    z_main: './main.js' // main为业务逻辑文件，以z开头，确保在最后
  },
  output: {
    path: `${__dirname}/dist`,
    filename: 'video-manager-[name]-[hash].js',
    publicPath: buildConfig.prod.staticDomain
  },
  devServer: {
    inline: false
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader?presets[]=es2015'
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
          name: '[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/index.html`,
      inject: 'body',
      filename: `${__dirname}/dist/index.html`,
      minify: {
        html5: true,
        ignoreCustomComments: true,
        minifyCSS: true,
        minifyJS: true,
        preserveLineBreaks: true,
        preventAttributesEscaping: true
      },
      cache: true,
      chunksSortMode: (a, b) => a.names[0] > b.names[0] // 给插入html中的js文件排序
    }),
    new ExtractTextPlugin('[name]-[hash].css'), // 单独抽出css文件插入html
    new webpack.optimize.UglifyJsPlugin({
      compress: true,
      mangle: true,
      'mangle.props': true,
      comments: false
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"prod"'
      }
    })
  ]
};

export default config;
