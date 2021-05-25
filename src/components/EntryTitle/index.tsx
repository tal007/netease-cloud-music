/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:42:58
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-25 16:40:21
 * 带 Link 的模块导航 Title
 */

import './index.less';
import { FC } from 'react';
import { RightOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;
const EntryTitle: FC<{ titleName: string; to?: string }> = ({
  titleName,
  to = ''
}) => {
  return (
    <Title level={4} className="entry-title">
      <Link to={to}>
        {titleName} <RightOutlined />
      </Link>
    </Title>
  );
};

export default EntryTitle;
