export default class PageConfig{
  /** 主题颜色 */
  theme:string = 'greenblack'
  /** 左侧模式 */
  leftTheme:'dark'|'light' = 'light'

  topTheme:'dark'|'light'|'primary' = 'light'

  layoutType:'left'|'top'|'topLeft'|'auto' = 'left'

  topFixed:boolean = true

  leftFixed:boolean = true

  menuPostion:'left'|'top' = 'left'

  showBreadcrumb:boolean = true
}