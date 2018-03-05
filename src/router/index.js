import Vue from 'vue';
import Router from 'vue-router';
const _import = path => () => import('@/pages/' + path + '.vue'); //懒加载

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'time',
      component: _import('time/time')
    }
  ]
});
