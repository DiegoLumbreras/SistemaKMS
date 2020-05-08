const test = 1
console.log(test)

import Vue from 'vue'
import router from './router'
import App from '@/components/layout/App'
import Axios from 'axios'
import SweetAlert2 from 'sweetalert2'
import VueSweetalert2 from 'vue-sweetalert2' 
import $ from 'jquery';
import 'select2';
import 'foundation-sites';
Vue.use(VueSweetalert2)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  menu:0,
  components: { App },
  template: '<App/>'
})