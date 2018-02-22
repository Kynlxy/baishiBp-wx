// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './store'
import 'vue-layer-mobile/need/layer.css'
import layer from 'vue-layer-mobile'
import {Common} from './assets/common/base'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import dateTime from './assets/common/dateTime.js'
Vue.use(VueAwesomeSwiper)
Vue.use(dateTime);


Vue.use(layer)
Vue.use(VueResource)
Vue.prototype.$main = Common;
window.Commmon = Common;
//引入静态资源
require('./assets/css/base.css')
// require('./assets/css/calendar.css')
Vue.config.productionTip = false
// router.beforeEach((to,from,next) => {
//   if(to.matched.some( m => m.meta.auth)){
//   // 对路由进行验证
//   if(store.state.isLogin) { // 已经登陆
//     next()
//   }else{
//     // 未登录,跳转到登陆页面，并且带上 将要去的地址，方便登陆后跳转。
//     next({path:'/login'})
//   }
// }else{
//   next()
// }
// })
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
