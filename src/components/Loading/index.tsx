import './index.less'
import { FC } from 'react';
import { Spin } from 'antd';

const Loading: FC = () => {
  return (
    <div className="loading">
      <Spin className="loading-spin" size="large" />
    </div>
  );
};

export default Loading;
