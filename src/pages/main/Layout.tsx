import React,{useState,useEffect,useMemo} from 'react';
import { Layout as AntLayout, Menu, Drawer ,Dropdown,Divider,Switch,Radio} from 'antd';
import { RouteChildrenProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import Theme from '@/theme'
import _ from 'lodash'
import {AntIcon,IconFont,history,Menu as MLMenu,useMenuControl} from '@cyber-ccx/lib'
import faker from 'faker'
import './layout.less';
import { userInfo } from 'os';
import { useStore} from '@/models'


const { Header, Content, Footer, Sider } = AntLayout;


interface IProps extends RouteChildrenProps{

}


const Layout:React.FC<IProps> = (props) => {
  const {global} = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const [isSetting,setSetting] = useState(false);
  const menuControl = useMenuControl();
  const [hasChildren,setHasChildren] = useState(false);

  const logout = () => {
    global.logout();
    props.history.push('/login');
  }


  const UserMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<AntIcon type={'EditOutlined'}/>} onClick={logout}>
        <span >修改密码</span>
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="logout" icon={<IconFont type={'icontuichu'}/>} onClick={logout}>
        <span >退出登录</span>
      </Menu.Item>
    </Menu>
  );

  useEffect(()=>{
    setHasChildren(menuControl.current.hasChildren);
    menuControl.on('changeHasChildren',()=>{
      setHasChildren(menuControl.current.hasChildren)
    });
  },[]);
  
  let layoutClass = global.pageConfig.layoutType === 'auto' ?hasChildren ?'topLeft' :'top' :  global.pageConfig.layoutType;
                    
  return (
    <AntLayout className={`main ${global.pageConfig.layoutType === 'auto'&&!hasChildren?'no-leftmenu':''} ${collapsed?'collapsed-main':''} ${layoutClass}-layout ${global.pageConfig.leftFixed?'fixed-left':''} ${global.pageConfig.topFixed?'fixed-top':''}`} >
      <Sider className={'left-sider'} width={256} theme={global.pageConfig.leftTheme} collapsible collapsed={collapsed} onCollapse={()=>setCollapsed(!collapsed)}>
        <div className="left-logo">
          {collapsed?
            <span>logo-mini</span>:
            <span>logo</span>
          }
        </div>
        <div style={{flex:1,overflowY:'auto',overflowX:'hidden'}}>
          <MLMenu
            style={{display:global.pageConfig.menuPostion !== 'top'?'block':'none'}}
            theme={global.pageConfig.leftTheme} menuControl={menuControl}  autoMenu={global.pageConfig.layoutType === 'auto'}/>
        </div>
      </Sider> 
      <AntLayout className={collapsed?'collapsed-content':''}>
        <Header className={global.pageConfig.topTheme} >
          <div className="logo">
            
          </div>
          <div style={{flex:1}}>
            <MLMenu 
              theme={global.pageConfig.topTheme!=='primary'?global.pageConfig.topTheme:'dark'}
              mode="horizontal"
              menuControl={menuControl} 
              autoMenu={global.pageConfig.layoutType === 'auto'}
              rootMenu
              style={{
                display:(global.pageConfig.menuPostion !== 'left'||global.pageConfig.layoutType === 'auto')?'block':'none',
                marginTop:'-1px',
                background: 'transparent',
                borderBottom:'0px',
              }}/>
          </div>
          <Dropdown overlay={UserMenu} placement="bottomCenter">
            <div className="user-info">
              <div className="user-head">{'用户名'.substring(0,1)}</div>
              <p>{'用户名'}</p>
            </div>
          </Dropdown>
          <div>
            <div className="btn setting" onClick={()=>setSetting(true)}>
              <AntIcon type={'MoreOutlined'} style={{fontSize:'16px'}}/>
            </div>
            <Drawer
              placement="right"
              width={300}
              onClose={()=>setSetting(false)}
              visible={isSetting}
            >
              <div style={{padding:'30px 15px'}}>
                <Divider plain>侧栏风格</Divider>
                <LeftCheck/>
                
                <Divider plain>顶栏风格</Divider>
                <TopCheck/>
                <Divider plain>主题颜色</Divider>
                <ColorCheck/>
                <Divider plain>导航模式</Divider>
                <TypeCheck/>
                <Divider plain>更多设置</Divider>
                <MoreSettting/>
              </div>
              
            </Drawer>
          </div>
        </Header>
        <Content >
            {props.children}
        </Content>
      </AntLayout>
    </AntLayout>
  )
}

const MoreSettting:React.FC<any> = observer(() => {
  const {global} = useStore();

  const changeType = (key:'leftFixed'|'topFixed'|'showBreadcrumb',str:boolean) => {
    let pageConfig = {...global.pageConfig};
    pageConfig[key] = str;
    global.changePageConfig(pageConfig);
  }

  const changeMenu = (str:any) => {
    let pageConfig = {...global.pageConfig};
    pageConfig.menuPostion = str;
    global.changePageConfig(pageConfig);
  }

  return (
    <ul className="more-settting">
      <li>
        <span>固定侧栏</span>
        <Switch checked={global.pageConfig.leftFixed} disabled={global.pageConfig.layoutType === 'top'} onChange={(v)=>changeType('leftFixed',v)} />
      </li>
      <li>
        <span>固定顶栏</span>
        <Switch checked={global.pageConfig.topFixed}  onChange={(v)=>changeType('topFixed',v)} />
      </li>
      <li>
        <span>菜单位置</span>
        <Radio.Group
          options={[
            { label: '侧栏', value: 'left' ,disabled:global.pageConfig.layoutType === 'top'||global.pageConfig.layoutType==='auto'},
            { label: '顶栏', value: 'top',disabled:global.pageConfig.layoutType === 'auto'},
          ]}
          onChange={(v)=>changeMenu(v.target.value)}
          size="small"
          value={global.pageConfig.layoutType === 'auto'?'':global.pageConfig.menuPostion}
          optionType="button"
        />
      </li>
      <li>
        <span>面包屑</span>
        <Switch checked={global.pageConfig.showBreadcrumb}  onChange={(v)=>changeType('showBreadcrumb',v)} />
      </li>
    </ul>
  )
})

const TypeCheck:React.FC<any> = observer(() => {

  const {global} = useStore();

  const changeType = (str:any) => {
    let pageConfig = {...global.pageConfig};
    pageConfig.layoutType = str;
    if(str === 'top'){
      pageConfig.leftFixed = false;
      pageConfig.menuPostion = 'top';
    }else{
      pageConfig.leftFixed = true;
      pageConfig.menuPostion = 'left';
    }
    global.changePageConfig(pageConfig);
  }

  return (
    <ul className="theme-check">
      <li onClick={()=>changeType('left')} className={'theme1'}>
        
        {global.pageConfig.layoutType === 'left'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
      <li onClick={()=>changeType('top')} className={'theme5'}>
        
        {global.pageConfig.layoutType === 'top'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
      <li onClick={()=>changeType('topLeft')} className={'theme6'}>
        
        {global.pageConfig.layoutType === 'topLeft'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
      <li onClick={()=>changeType('auto')} className={'theme7'}>
        
        {global.pageConfig.layoutType === 'auto'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
    </ul>
  )
})

const TopCheck:React.FC<any> = observer(() => {

  const {global} = useStore();

  const changeTop = (str:any) => {
    let pageConfig = {...global.pageConfig};
    pageConfig.topTheme = str;
    global.changePageConfig(pageConfig);
  }

  return (
    <ul className="theme-check">
      <li onClick={()=>changeTop('light')} className={'theme1'}>
        
        {global.pageConfig.topTheme === 'light'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
      <li onClick={()=>changeTop('dark')} className={'theme3'}>
        
        {global.pageConfig.topTheme === 'dark'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
      <li onClick={()=>changeTop('primary')} className={'theme4'}>
        
        {global.pageConfig.topTheme === 'primary'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
    </ul>
  )
})

const LeftCheck:React.FC<any> = observer(() => {

  const {global} = useStore();

  const changeLeft = (str:any) => {
    let pageConfig = {...global.pageConfig};
    pageConfig.leftTheme = str;
    global.changePageConfig(pageConfig);
  }

  return (
    <ul className="theme-check">
      <li onClick={()=>changeLeft('dark')} className={'theme1'}>
        {global.pageConfig.leftTheme === 'dark'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
      <li onClick={()=>changeLeft('light')} className={'theme2'}>
        {global.pageConfig.leftTheme === 'light'&&
          <AntIcon type={'CheckOutlined'}/>
        }
      </li>
    </ul>
  )
})

const ColorCheck:React.FC<any> = observer(() => {
  const {global} = useStore();

  const changeColor = (preset:any) => {
    Theme.changeTheme(preset);
    let pageConfig = {...global.pageConfig};
    pageConfig.theme = preset.typeKey;
    global.changePageConfig(pageConfig);
  }
  return (
    <ul className="color-check">
      {_.entries(Theme.preset).map((obj)=>(
        <li key={obj[0]} style={{background:obj[1].primaryColor}} onClick={()=>changeColor(obj[1])}>
          {obj[0] === global.pageConfig.theme&&
            <AntIcon type={'CheckOutlined'}/>
          }
        </li>
      ))}
    </ul>
  )
});

export default observer(Layout)