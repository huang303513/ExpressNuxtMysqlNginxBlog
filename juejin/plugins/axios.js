import * as axios from 'axios'
import { getCookieInClient } from '../util/assist'

export default ({ app, store, redirect }) => {

	// The server-side needs a full url to works
	if (process.SERVER_BUILD) {
		axios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 5000}`
	}

	// interceptors request
	axios.interceptors.request.use(config => {
		//如果客户端有token的话。加入请求头中
		if (typeof document === 'object') {
			let token = getCookieInClient('token')
			if (token) {
				config.headers.Authorization = token;
			}
		}
		return config;
	}, err => {
		return Promise.reject(err);
	});
	//如果是401的话，就直接跳转到登陆页面
	axios.interceptors.response.use(response => {
		if (response.data.code === 401) {
			redirect('/login')
		}
		return response;
	}, function (error) {
		return Promise.reject(error);
	});

}