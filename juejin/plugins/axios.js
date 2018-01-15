import * as axios from 'axios'
import {
    getCookieInClient
} from '../util/assist'
import getConfig from '../config';
let config = getConfig(process.env.NODE_ENV);
console.log("url=================>",config.apiHost + ":" + config.apiPort);
axios.defaults.baseURL = config.apiHost + ":" + config.apiPort;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*";

axios.defaults.withCredentials = true
axios.interceptors.response.use(response => {
    // console.log("===========");
    // console.log("===========headers========",response.headers);
    // delete response.headers.etag;
    // console.log("=========response========", response.status);
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

// export default ({ app, store, redirect }) => {

// 	// The server-side needs a full url to works
// 	// if (process.SERVER_BUILD) {
// 	// 	axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}`
// 	// }
// 	//if (!axios.defaults.baseURL) {
// 		axios.defaults.baseURL = "http://127.0.0.1:3002";
// 		//axios.defaults.withCredentials=true;
// 	//}
// 	axios.defaults.withCredentials=true;
// 	console.log("baseRUL===============>" + axios.defaults.baseURL);
// 	// interceptors request
// 	// axios.interceptors.request.use(config => {

// 	// 	//如果客户端有token的话。加入请求头中
// 	// 	// if (typeof document === 'object') {
// 	// 	// 	let token = getCookieInClient('token')
// 	// 	// 	if (token) {
// 	// 	// 		config.headers.Authorization = token;
// 	// 	// 	}
// 	// 	// }
// 	// 	return config;
// 	// }, err => {
// 	// 	return Promise.reject(err);
// 	// });
// 	//如果是401的话，就直接跳转到登陆页面
// 	axios.interceptors.response.use(response => {
// 		// if (response.data.code === 401) {
// 		// 	redirect('/login')
// 		// }

// 		console.log("============正确===========",response);
// 		// return (response&&response.data)||{};
// 		//return Promise.resolve(response && response.data);
// 		if (!response) {
// 			return  {
// 				success:false,
// 				result:{}
// 			};
// 		}
// 		return {
// 			success:true,
// 			result:response.data
// 		};
// 	}, function (error) {
// 		console.log("======================错误==========================");
// 		return {
// 			success:false,
// 			result:error
// 		};
// 		//return error;
// 		//console.log("======================错误==========================");
// 		//return Promise.reject(error);
// 	});

// }
