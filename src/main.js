import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'u-reset.css'
import filter from './filter/index'
let filterKeys = Object.keys(filter);
filterKeys.forEach(ele => {
  Vue.filter(ele,filter[ele]);
})
Vue.use(ElementUI);


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
