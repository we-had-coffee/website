import Vue from 'vue'
import App from './App.vue'
import getRouter from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
getRouter().then((router) => {
  new Vue({
    router,
    store,
    vuetify,
    render: function (h) { return h(App) }
  }).$mount('#app')
})