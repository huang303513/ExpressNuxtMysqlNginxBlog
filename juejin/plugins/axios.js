import * as axios from 'axios'
import { getCookieInClient } from '../util/assist'

export default ({ app, store, redirect }) => {

	// The server-side needs a full url to works
	// if (process.SERVER_BUILD) {
	// 	axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}`
	// }
	if (!axios.defaults.baseURL) {
		axios.defaults.baseURL = "http://127.0.0.1:3002";
	}
	console.log("baseRUL===============>" + axios.defaults.baseURL);
	// interceptors request
	// axios.interceptors.request.use(config => {
	// 	//如果客户端有token的话。加入请求头中
	// 	if (typeof document === 'object') {
	// 		let token = getCookieInClient('token')
	// 		if (token) {
	// 			config.headers.Authorization = token;
	// 		}
	// 	}
	// 	return config;
	// }, err => {
	// 	return Promise.reject(err);
	// });
	//如果是401的话，就直接跳转到登陆页面
	// axios.interceptors.response.use(response => {
	// 	// if (response.data.code === 401) {
	// 	// 	redirect('/login')
	// 	// }
		
	// 	console.log("============正确===========",response);
	// 	return (response&&response.data)||{};
	// 	//return Promise.resolve(response && response.data);
	// }, function (error) {
	// 	console.log("======================错误==========================");
	// 	return Promise.reject(error);
	// });

}