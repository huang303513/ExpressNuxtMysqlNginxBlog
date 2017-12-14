// let devConfig = require('./default.js');
import {default as devConfig} from './default.js';

let proConfig = {
    devEnv: true,
    port: 3002,
    sslModel: false
}
let disConfig = Object.assign({}, devConfig, proConfig);

export default disConfig;