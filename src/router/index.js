import Vue from 'vue';
import Router from 'vue-router';
const _import = path => () => import('@/pages/' + path + '.vue'); //懒加载

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: _import('home'),
      children: [{
        path: '',
        name: 'calendar',
        component: _import('calendar/calendar'),
      },{
        path: 'time',
        name: 'time',
        component: _import('time/time'),
      }]
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login'),
    },
    {
      path: '/register',
      name: 'register',
      component: _import('register'),
    }
  ]
});
