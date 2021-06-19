import loadable from '@loadable/component';

export default (children?:any) => [
  {
      needLogin:true,
      menuRoot:true,
      resourceName:'首页',
      routerUrl:'/main',
      type:'2',
      resourceIcon:'',
      buttons:[],
      component:loadable(()=>import('./Layout')),
      children
  }
]