import Vue from 'vue'
import Router from 'vue-router'
import channel from '@/components/channel/channel'
import show from '@/components/show/show'
import userCenter from '@/components/user-center/user-center'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/channel'
    }, {
      path: '/channel',
      component: channel,
      children: [{
        path: ':id',
        component: show
      }]
    }, {
      path: '/center',
      component: userCenter
    }
  ]
})
