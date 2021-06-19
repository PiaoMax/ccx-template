import { observable, computed, action ,makeObservable} from "mobx"
import PageConfig from '@/theme/PageConfig'
import { LocalStorage } from '@cyber-ccx/lib'
import _ from 'lodash'
import config from "../config";

export class GlobalModel {

  constructor(){
    makeObservable(this);
  }
  /**
   * 是否登录
   */
  @observable isLogin: boolean = true
  /**
   * 加载中计数器
   */
  @observable _loadingNum: number = 0

  /**
   * 页面配置信息
   */
  @observable pageConfig: PageConfig = _.assign(new PageConfig(), LocalStorage.get('pageConfig'))

  @action.bound
  changePageConfig(config: PageConfig) {
    this.pageConfig = config;
    LocalStorage.set('pageConfig', config);
  }

  /**
   * 全局是否加载中
   */
  @computed get loading() {
    return this._loadingNum !== 0
  }

  /** 
   * 登陆完成
   */
  @action.bound
  login(user: any) {

  }
  /**
   * 登出
   */
  @action.bound
  logout() {
    this.isLogin = false;
  }

}

export default new GlobalModel();
