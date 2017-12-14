/*
 * @Author: huangchengdu
 * @Date:   2017-01-14 18:47:32
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-15 08:18:01
 */

// let devConfig = require('./default.js');
import {default as devConfig} from './development.js';

let proConfig = {
    devEnv: false,
    port: 3002,
    sslModel: false
}
let disConfig = Object.assign({}, devConfig, proConfig);

export default disConfig;