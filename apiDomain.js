import config from './buildConfig.js';

const apiDomain = process.env.NODE_ENV === 'dev' ? config.dev.apiDomain : config.prod.apiDomain;

export default apiDomain;
