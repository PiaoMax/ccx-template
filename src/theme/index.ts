
interface ThemeSet {
  [k:string]:any
  modifyVars:object
}
import PageConfig from '@/theme/PageConfig'
import _ from 'lodash'
import {LocalStorage} from '@cyber-ccx/lib';

export default class Theme{
  /** 预设皮肤 */
  static preset = {
    greenblack:{
      name: '墨绿风格',
      typeKey: 'greenblack',
      primaryColor: '#02a678',
      modifyVars: {
        '@primary-color': '#02a678',
        '@link-color': '#02a678',
        '@btn-primary-bg': '#02a678',
      },
    },
    skyblue:{
      name: '蓝色风格',
      typeKey: 'skyblue',
      primaryColor: '#2DA9FA',
      modifyVars: {
        '@primary-color': '#2DA9FA',
        '@link-color': '#2DA9FA',
        '@btn-primary-bg': '#2DA9FA',
      },
    },
    green:{
      name: '绿色风格',
      typeKey: 'green',
      primaryColor: '#1FC695',
      modifyVars: {
        '@primary-color': '#1FC695',
        '@link-color': '#1FC695',
        '@btn-primary-bg': '#1FC695',
      },
    },
    graydark:{
      name: '灰色风格',
      typeKey: 'graydark',
      primaryColor: '#474c5a',
      modifyVars: {
        '@primary-color': '#474c5a',
        '@link-color': '#474c5a',
        '@btn-primary-bg': '#474c5a',
      },
    },
  }

  /**
   * 设置主题
   * @param set 
   */
  static changeTheme = (set:ThemeSet) => {
    window.less.modifyVars(set.modifyVars);
  }

  static initTheme = () => {
    let pageConfig:PageConfig = _.assign(new PageConfig(), LocalStorage.get('pageConfig'));
    let pre:any = Theme.preset;
    window.less.modifyVars(pre[pageConfig.theme].modifyVars);
  }
}