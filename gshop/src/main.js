/*
入口js
 */
import Vue from 'vue'
import {Button} from 'mint-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'mint-ui/lib/style.css'
import './mock/mockServer'



Vue.component(Button.name, Button)
// Vue.use(Button)
new Vue({
  el:'#app',
  // render: h => h(App),
  render: function(createElement) {
    return createElement(App);
  },
  router, // 使用vue-router
  store, // 使用vuex
})
