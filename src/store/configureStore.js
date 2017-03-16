/**
 * Created by zhaoyan on 17/1/20.
 */
if (process.env.NODE_ENV === 'prod') {
  module.exports = require('./configureStore.prod');
} else {
  module.exports = require('./configureStore.dev');
}
