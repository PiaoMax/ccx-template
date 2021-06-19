import loadable from '@loadable/component';

export default () => [
  {
      needLogin:false,
      resourceName:'登陆',
      routerUrl:'/login',
      type:'2',
      resourceIcon:'',
      buttons:[],
      component:loadable(()=>import('./Login'))
  }
]