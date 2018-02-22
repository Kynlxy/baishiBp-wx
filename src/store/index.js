/**
 * Created by kyn on 17/9/24.
 */
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state:{
    isLogin:false   //是否登录
  },

  mutations: {
    addLogin (state) {
      state.isLogin = true
    },
    reduceLogin (state) {
      state.isLogin = false
    }
  }
})
export default store
