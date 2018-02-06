import * as axios from 'axios'
import {
    getCookieInClient
} from '../util/assist'
import getConfig from '../config';
let config = getConfig(process.env.NODE_ENV);
axios.defaults.baseURL = config.apiHost + ":" + config.apiPort;

axios.defaults.withCredentials = true
axios.interceptors.response.use(response => {
    if (response && response.status && (response.status == 200)) {
        return Promise.resolve({
            error: null,
            data: response.data
        });
    } else {
        if (config.devEnv) {
            return Promise.resolve({
                error: null,
                data: response.data
            });
        } else {
            return Promise.reject({
                error: {
                    message: "出错了"
                },
                data: response
            });
        }
    }
});
