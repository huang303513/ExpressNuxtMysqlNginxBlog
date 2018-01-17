import Vue from 'vue'
import Notification from 'vue-notification'
import userLoginUtil from "../util/userLoginUtil.js";


Vue.use(Notification)
Vue.prototype.$eventHub= Vue.prototype.$eventHub ||  new Vue();

Vue.prototype.$showLoading = function() {
    this.$eventHub.$emit("SHOWLOADING", {
        loading: true
    });
}
Vue.prototype.$hiddenLoading = function() {
    this.$eventHub.$emit("SHOWLOADING", {
        loading: false
    });
}
Vue.prototype.$showAlert = function(params) {
    if (typeof(params) == 'string') {
        params = {
            message:params
        };
    }
    this.$eventHub.$emit("SHOWALERT", params);
}
Vue.prototype.$hiddenAlert = function() {
    this.$eventHub.$emit("HIDDENALERT", {});
}
Vue.prototype.$userLoginUtil = userLoginUtil;
