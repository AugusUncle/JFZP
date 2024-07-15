import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

Vue.config.productionTip = false

//取消 Vue 所有的日志与警告。
Vue.config.silent = true
// Vue.prototype.reqUrl = "http://192.168.1.112:8090"
// Vue.prototype.reqUrl = "http://127.0.0.1:8090"
// Vue.prototype.webSocket = "ws://192.168.1.112:8088/"
Vue.prototype.webSocket = "wss://skt.ykfly.com"
Vue.prototype.reqUrl = "https://jfzp.ykfly.com"

Vue.prototype.bgCol = "#F8F9FB"

App.mpType = 'app'


import httpInterceptor from './common/http.interceptor.js'
import uView from '@/uni_modules/uview-ui'
import share from 'utils/share.js'
import shareWxq from 'utils/shareWxq.js'

httpInterceptor();

Vue.use(uView)
Vue.mixin(share); 
Vue.mixin(shareWxq); 

const app = new Vue({
	...App
})
app.$mount()

// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif