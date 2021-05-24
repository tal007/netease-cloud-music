import './index.less';
import { FC, useState, MouseEvent } from 'react';
import Cookies from 'js-cookie';
import { Input, Button, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone
} from '@ant-design/icons';
import Pubsub from 'pubsub-js'

import useURLLoader from '../../hooks/useURLLoader'
import { checkIsEmpty } from '../../util'
import { LOGINDATA, ISLOGIN } from '../../constant'

type inputType = 'phone' | 'password' | 'email';

interface loginRequestData {
  phone?: string;
  email?: string;
  password: string;
}

const Login: FC<{setShowLogin: (boolean: boolean) => void}> = ({setShowLogin}) => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');

  const {
    ajax, 
    loading,
    setLoading
  } = useURLLoader();

  const login = () => {
    if (checkIsEmpty(account)) {
      message.error('请输入手机号或邮箱')
      return
    }
    if (checkIsEmpty(password)) {
      message.error('请输入密码')
      return
    }
    setLoading(true);

    const loginData: loginRequestData = {
      password: password
    }

    let url = '/login/cellphone'

    if (account.indexOf('@') > -1) {
      loginData.email = account
      url = '/login'
    } else {
      loginData.phone = account
    }
        
    ajax<LoginData>(url, "POST", loginData)
    .then(response => {
      console.log(response);
      Cookies.set(LOGINDATA, response.profile);
      Pubsub.publish(ISLOGIN, true);
      setShowLogin(false);
    }).catch(err => {
      setShowLogin(false);
    })
  };
    
  const handleInput = (type: inputType, event: any) => {
    if (type === 'phone') {
      setAccount(event.target.value);
    }
    if (type === 'password') {
      setPassword(event.target.value);
    }
  };

  return (
    <section className="app-login" onClick={(e: MouseEvent) => e.stopPropagation() }>
      <div className="app-login-container">
        <h3>登陆</h3>
        <Input
          size="large"
          placeholder="请输入大陆手机号或邮箱"
          prefix={<UserOutlined className="site-form-item-icon" />}
          onInput={(e) => handleInput('phone', e)}
        />
        <Input.Password
          size="large"
          placeholder="请输入密码"
          prefix={<LockOutlined className="site-form-item-icon" />}
          iconRender={(visible) =>
            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
          }
          onInput={(e) => handleInput('password', e)}
        />
        <Button loading={loading} size="large" type="primary" block onClick={login}>
          登陆
        </Button>
        <Button onClick={() => setShowLogin(false)} size="large" block>取消</Button>
      </div>
    </section>
  );
};

export default Login;
