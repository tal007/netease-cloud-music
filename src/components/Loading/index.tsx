import './index.less';
import { FC } from 'react';
import { Spin } from 'antd';

const Loading: FC = () => {
  return (
    <div className="loading">
      <Spin className="loading-spin" size="large" />
    </div>
  );
};

export const LoadingContainer: FC<{
  children?: React.ReactElement;
  showIcon?: boolean;
}> = ({ children, showIcon = true }) => {
  return (
    <div className="loading-container">
      {children}
      {showIcon && <Loading />}
    </div>
  );
};

export default LoadingContainer;
