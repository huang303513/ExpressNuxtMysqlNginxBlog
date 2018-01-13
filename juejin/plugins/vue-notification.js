import Vue from 'vue'
import Notification from 'vue-notification'

Vue.use(Notification)
Vue.prototype.$eventHub= Vue.prototype.$eventHub ||  new Vue();