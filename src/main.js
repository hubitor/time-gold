import Vue from 'vue';
import App from './App';
import router from './router';

// import '@/assets/css/amazeui.min.css';
// import '@/assets/css/amazeui.datatables.min.css';
import 'amaze-vue/dist/amaze-vue.css';
import '@/assets/css/app.css';

// import '@/assets/js/amazeui.datatables.min.js';
// import '@/assets/js/dataTables.responsive.min.js';
import AmazeVue from 'amaze-vue';
Vue.use(AmazeVue);

import $http from '@/assets/utils/httpInterceptor';
Vue.prototype.$http= $http;

import 'fullcalendar';

Vue.config.productionTip = false;

const bus = new Vue();
global.bus = bus;

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
