/*
 * @Author: huangchengdu
 * @Date:   2017-01-14 18:47:32
 * @Last Modified by:   huangchengdu
 * @Last Modified time: 2017-01-15 08:18:01
 */
import {default as devConfig} from './development.js';

let proConfig = {
    devEnv: false,
    port: 5389,//如果package.json里面不一样，以这里为准
    apiPort:443,
    apiHost:"https://www.huangchengdu.com",
    sslModel: false,
    uploadPath:'/usr/local/webserver/nginx/static/img/'
}
let disConfig = Object.assign({}, devConfig, proConfig);

export default disConfig;