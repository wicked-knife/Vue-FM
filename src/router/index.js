import Vue from 'vue'
import Router from 'vue-router'
// import channel from '@/components/channel/channel'
// import show from '@/components/show/show'
// import userCenter from '@/components/user-center/user-center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/channel'
    }, {
      path: '/channel',
      component: resolve => require(['@/components/channel/channel'], resolve),
      children: [{
        path: ':id',
        component: resolve => require(['@/components/show/show'], resolve)
      }]
    }, {
      path: '/center',
      component: resolve => require(['@/components/user-center/user-center'], resolve)
    }
  ]
})
