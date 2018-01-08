// let devConfig = require('./default.js');
import {default as devConfig} from './default.js';

let proConfig = {
    devEnv: true,
    port: 3002,
    apiPort:3002,
    apiHost:"http://127.0.0.1",
    sslModel: false
}
let disConfig = Object.assign({}, devConfig, proConfig);

export default disConfig;