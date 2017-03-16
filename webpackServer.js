import webpack from 'webpack';
// import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackDevServer from 'webpack-dev-server';
import config from './webpack.dev.config.babel.js';

config.entry.a_lib.unshift('webpack-dev-server/client?http://localhost:9000');  // 将执替换js内联进去
config.entry.a_lib.unshift('webpack/hot/only-dev-server');
config.entry.z_main.unshift('webpack-dev-server/client?http://localhost:9000');  // 将执替换js内联进去
config.entry.z_main.unshift('webpack/hot/only-dev-server');
const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
  hot: true,
  historyApiFallback: false,
  // noInfo: true,
  stats: {
    colors: true  // 用颜色标识
  },
  proxy: {
    '*': 'http://localhost:9000' // 用于转发api数据，但webpack自己提供的并不太好用
  }
});
server.listen(9000);
