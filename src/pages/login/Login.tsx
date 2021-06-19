import React, { useEffect, useState, useRef, useMemo } from 'react';
import { Button, Input, message, Spin, Select } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { RouteChildrenProps } from 'react-router-dom';
import { history, AntIcon } from '@cyber-ccx/lib';
import { observer } from 'mobx-react-lite'
import { useStore } from '@/models'
import QRcode from 'qrcode'
const { Option } = Select;

import styles from './login.module.less';

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

interface IProps extends RouteChildrenProps {

}

const Login: React.FC<IProps> = (props) => {
  const { global } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isQRcode, setIsQRcode] = useState(false);
  const [phoneStr, setPhoneStr] = useState<string>('');
  const [smsStr, setSmsStr] = useState<string>('');

  const [focusTarget, setFocusTarget] = useState<number>(0);
  const [isPhoneLogin, setIsPhoneLogin] = useState<boolean>(false);
  const [sendSMSLastCount, setSendSMSLastCount] = useState<number>(0);
  const [qrurl, setQrurl] = useState<string>();
  const code = useRef<string>();
  const timer = useRef<any>();
  const [qrStatus, setStatus] = useState(0);



  const loginIn = async () => {
    if (!username) {
      return message.error('请输入用户名！');
    }
    if (!password) {
      return message.error('请输入密码');
    }

    setLoading(true);
    let res;

    setLoading(false);
    // if (res.success && res.data) {
    //   // console.log('Success:', { username, password });
    //   // console.log(res);
    //   global.login(res.data);
    //   history.push('/main');
    // }
  };

  const userNamePrefix = useMemo(() => {
    return (
      <img src={focusTarget === 1 ? require('@/assets/images/username_28px_on.png') : require('@/assets/images/username_28px_off.png')}
        className={styles.tagImg} alt="" />
    );
  }, [focusTarget]);

  const passWordPrefix = useMemo(() => {
    return (
      <img src={focusTarget === 2 ? require('@/assets/images/password_28px_on.png') : require('@/assets/images/password_28px_off.png')}
        className={styles.tagImg} alt="" />
    );
  }, [focusTarget]);

  return (
    <div className={styles.newLoginContainer}>
      <Spin spinning={loading} tip={'正在处理。。。'} size={'large'}>
        <div className={styles.newLoginInnerContainer}>

          <div className={styles.centerContainer}>
            <div className={styles.loginCard}
              onBlur={({ target }) => {
                if (target && target.id) {
                  setFocusTarget(0);
                }
              }}
              onFocus={({ target }) => {
                if (target && target.id) {
                  setFocusTarget(target.id === 'userName' ? 1 : 2);
                }
              }}>
              <div className={styles.textContainer}>
                <span className={isPhoneLogin ? styles.normal : styles.select} onClick={() => setIsPhoneLogin(false)}>账号登录</span>
              </div>
              <>
                <div className={styles.inputContainer}>
                  <div className={styles.inputItem}>
                    <Input className={styles.inputEle}
                      id={'userName'}
                      prefix={userNamePrefix}
                      value={username} placeholder={'请输入用户名'}
                      onChange={(ev) => setUsername(ev.target.value)} />
                  </div>
                </div>

                <div className={styles.inputContainer}>
                  <div className={styles.inputItem}>
                    <Input.Password
                      className={styles.inputEle}
                      id={'password'}
                      prefix={passWordPrefix}
                      value={password} placeholder="请输入密码"
                      onChange={(ev) => setPassword(ev.target.value)}
                      iconRender={visible => (visible ? <AntIcon type={'EyeTwoTone'} /> :
                        <AntIcon type={'EyeInvisibleOutlined'} />)}
                      onPressEnter={loginIn} />
                  </div>
                </div>


                <div className={styles.inputContainer}>
                  <div className={styles.inputItem}>
                    <Button className={styles.btnContainer}
                      type={'primary'}
                      onClick={loginIn}>
                      登录
                    </Button>
                  </div>

                </div>
              </>
            </div>
          </div>

          <div className={styles.bg}>
            
          </div>

        </div>
      </Spin>

    </div>
  )
}

export default observer(Login)