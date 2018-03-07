import Vue from 'vue';
import App from './App';
import router from './router';

import '@/assets/css/amazeui.min.css';
import '@/assets/css/amazeui.datatables.min.css';
import '@/assets/css/app.css';

import '@/assets/js/amazeui.datatables.min.js';
import '@/assets/js/dataTables.responsive.min.js';

Vue.config.productionTip = false;

const bus = new Vue();
global.bus = bus;

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
