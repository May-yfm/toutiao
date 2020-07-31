import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import axios from 'axios' //引入原始axios
import axios from './comment/myaxios' //引入配置后的axios

Vue.prototype.$axios = axios //在vue的原型上添加$axios

//

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
