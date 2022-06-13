import Request from './request.js'
import store from '@/store/index.js'
import Url from './url.js'


// 生产api部署在http://47.115.59.173:8001/上
// const baseUrl = process.env.NODE_ENV === 'development' ? "http://0.0.0.0:8040" : "http://47.115.59.173:8001/"

var baseUrl = Url;

var config = {
	baseUrl: baseUrl
}



const reqInterceptor = async (options) => {
	options.header = { // 头部塞入token 进行验证
		...options.header,
		// token: '75f360c6-8680-436e-ad87-7bb763817e7d'
		token:store.state.token
		
	}
	console.log(options.header);
	//判断是否为动态路由
	if (options.restful) {
		for (const key of Object.keys(options.data)) {
			options.url = options.url + "/" + options.data[key];
		}
	}
	//判断是否为动态路由
	if (options.restfulB) {
		let url = "";
		for (const key of Object.keys(options.data)) {
			if(options.data[key] instanceof Array){
				for(let i = 0;i<options.data[key].length;i++){
					url +=  key + "=" + options.data[key][i] + "&";
				}
			}else{
				url += key + "=" + options.data[key] + "&";
			}
		}
		let str = url.substr(0,url.length-1)
		options.url = options.url + "?" + str.replace(/\s/g, "");
		console.log(options.url);
		options.data = {};
	}
	
	//判断是否为动态路由
	if (options.restfulC) {
		for (const key of Object.keys(options.data)) {
			options.url = options.url + "?" + key + "="+ options.data[key];
		}
	}
	// 默认加载loading
	// if (!options.hideLoading) {
	// 	uni.showLoading({
	// 	    title: '加载中...'
	// 	});
	// }

	//TODO do your request interceptor, such as url/header config, token refresh...
	_requestLog(options, "成功通过")
	// return false will abort the request, and then reject a blank object {}
	return options
}
const successHandler = (response) => {
	// console.log(response);
}
const failHandler = (response) => {
	// console.log("2222222" + JSON.stringify(response));
}
const resInterceptor = (response, conf = {}) => {
	// uni.hideLoading();
	// TODO do your response
	// if (response.data.requireLogin) {
	// 	uni.reLaunch({
	// 		url: '/pages/subpages/account/login'
	// 	});
	// }
	if (response.header["refresh-token"] && response.header["refresh-token"] != "") {
		console.log("刷新token");
		store.commit('refeshToken',{token: response.header["refresh-token"]});
	}
	if (response.data.requireLogin) {
		// uni.reLaunch({
		// 	url: '/pages/subpages/account/login'
		// });
	}
	// console.log(JSON.stringify(response));
	const statusCode = response.statusCode
	console.log(statusCode);
	// response interceptor
	if (statusCode >= 200 && statusCode < 300) { //成功
		_responseLog(response, conf, "response 200-299")
		return response.data
	} else if (statusCode === 500) {
		console.log('statusCode：' + statusCode)
		uni.showToast({
			icon: 'none',
			title: '服务器错误'
		});
		_responseLog(response, conf, "response 500")
		// 为了对reject的内容更加可控，我们增加了一个控制字段 wakaryReqToReject
		return {
			// 根据当前字段来判断是否reject
			wakaryReqToReject: true,
			// 下面可以配置您的其它返回信息，方便您更加统一的处理reject的内容。
			// 以下内容会被作为reject的返回，根据您的需要处理，比如返回您的具体错误信息
			msg: "服务器错误",
			res: response
		}
	} else {
		// uni.showToast({
		// 	icon: 'none',
		// 	title: '服务器异常'
		// });
		if(statusCode === 401){
			uni.showToast({
				icon: 'none',
				title: '请登录',
				success: () => {
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/account/index'
						});
					}, 300);
				}
			});
		}
		_responseLog(response, conf, "response 300-499")
		// 为了对reject的内容更加可控，我们增加了一个控制字段 wakaryReqToReject
		return {
			// 根据当前字段来判断是否reject
			wakaryReqToReject: true,
			// 下面可以配置您的其它返回信息，方便您更加统一的处理reject的内容。
			// 以下内容会被作为reject的返回，根据您的需要处理，比如返回您的具体错误信息
			msg: "这里是提示信息",
			res: response
		}
	}
}

const req = new Request(config, reqInterceptor, resInterceptor, successHandler, failHandler)

// request log
function _requestLog(req, describe = null) {
	// console.log(req);
	if (process.env.NODE_ENV === 'development') {
		// console.log("request地址：" + req.url)
		// if (describe) {
		// 	console.log("request描述：" + describe)
		// }
		// console.log("request详细：" + JSON.stringify(req))
	}
	//TODO into log server
}

// response log
function _responseLog(res, conf = {}, describe = null) {
	// console.log(res);
	let _statusCode = res.statusCode;
	if (process.env.NODE_ENV === 'development') {
		// console.log("response地址: " + conf.url)
		// if (describe) {
		// 	console.log("response描述：" + describe)
		// }
	}
	//TODO into log server
	if (_statusCode === 500) {
		// 
	}
}

export default req
