import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store';
import Mint from 'mint-ui';
import VueRouter from 'vue-router'
import routes from './router/Router.js'

Vue.use(Mint);
Vue.use(VueRouter)
import 'mint-ui/lib/style.css';


Vue.config.productionTip = false



const router = new VueRouter({
  	routes // （缩写）相当于 routes: routes
})
		
new Vue({
	store,
	router,
  	render: h => h(App)
}).$mount('#app')
