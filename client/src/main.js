import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


//whenever we visit the website, it should always try to retrieve user information
store.dispatch("loginUser/whoami");

// loginServ.login("joelle", "123456").then(
//   () => {
//     loginServ.whoami().then((resp) => {
//       console.log(resp);
//     })
//   }

// )

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
