import './index.less';
import { FC, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Avatar, Space, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import Pubsub from 'pubsub-js'

import Login from '../Login/index';
import { LOGINDATA, ISLOGIN } from '../../constant';

const User: FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [loginData, setLoginData] = useState<LoginProfile>({} as LoginProfile);

  useEffect(() => {
    // 重新打开页面判断是否登陆
    const res = Cookies.get(LOGINDATA);
    if (res) {
      console.log(res);
      setIsLogin(true);
      setLoginData(JSON.parse(res));
    }

    // 监听重新登陆的情况
    const pubsub = Pubsub.subscribe(ISLOGIN, (msg: string, data: boolean) => {
      const res = Cookies.get(LOGINDATA);
      if (data && res) {
        setIsLogin(true);
        setLoginData(JSON.parse(res));
      }
    })

    return () => {
      Pubsub.unsubscribe(pubsub)
    }
  }, [setIsLogin]);

  const loginOut = () => {
    setIsLogin(false);
    Cookies.remove(LOGINDATA);
  };

  return (
    <div className="app-uers">
      <div className="app-login-status">
        <Space direction="vertical" size="small">
          {isLogin ? (
            <>
              <Avatar size="large" src={loginData.avatarUrl} />
              <span>{loginData.nickname}</span>
              <Button size="small" shape="round" onClick={loginOut}>
                退出登录
              </Button>
            </>
          ) : (
            <>
              <Avatar size="large" icon={<UserOutlined/>} />
              <span>请登录</span>
              <Button
                size="small"
                shape="round"
                onClick={() => setShowLogin(true)}
              >
                登录
              </Button>
            </>
          )}
        </Space>
      </div>
      {showLogin && <Login setShowLogin={setShowLogin} />}
    </div>
  );
};

export default User;
