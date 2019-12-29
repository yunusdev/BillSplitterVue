import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

Vue.filter('capitalize', function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('formatMoney', function (amount, decimalCount = 2, decimal = ".", thousands = ",") {

        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
});



Vue.config.productionTip = false

Vue.prototype.$http = Axios;

Vue.prototype.$backendBaseUrl = 'http://127.0.0.1:8000/';

window.Vue = require('vue');



Vue.component('bill-info', require('./components/BillInfo.vue').default);
Vue.component('invite-user', require('./components/InvitesUser').default);


const token = localStorage.getItem('token');

Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
