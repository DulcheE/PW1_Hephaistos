import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)

/* Test if the axios request work
axios.post('http://localhost:3000/api/v1/login', {
  username: 'eddy.dulche@efrei.net',
  password: '18A1aHAYJ0'
})
  .then((response) => {
    console.log(response.data)
  })
  .catch((err) => console.log(err))
*/

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
