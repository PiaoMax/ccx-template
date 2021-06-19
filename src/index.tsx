import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import $ from 'jquery'
import { RouterConfig, BrowserRouter, OSS } from '@cyber-ccx/lib';
import pageRoutes from '@/pages'
import 'antd/dist/antd.css'
import '@/index.less';
import 'moment/locale/zh-cn'
import Theme from '@/theme'

// OSS.init({
//   region: '',
//   accessKeyId: '',
//   accessKeySecret: '',
//   bucket: ''
// })

const validateMessages = {
  required: "${label} 是必填字段",
  types: {
    number: "请输入正确的数字",
    integer: "请输入整数",
    float: "请输入正确的数字",
    email: "请输入正确的邮箱"
  },
};

const App: React.FC<any> = () => {
  useEffect(() => {
    Theme.initTheme();
  }, []);

  return (
    <BrowserRouter >
      <ConfigProvider locale={zhCN} form={{ validateMessages }}>
        <RouterConfig key={'rootConfig'} routerJson={pageRoutes} root={'/login'} />
      </ConfigProvider>
    </BrowserRouter>
  )
}


$(()=>{
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );  
})

serviceWorker.unregister();
