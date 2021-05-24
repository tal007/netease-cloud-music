/*
 * @Author: 刘玉田 
 * @Date: 2021-05-24 10:42:58 
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-24 14:01:01
 * 带 Link 的模块导航 Title
 */

import './index.less'
import { FC } from 'react'
import { RightOutlined } from '@ant-design/icons'
import { Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title } = Typography;
const EntryTitle: FC<{titleName: string}> = ({titleName}) => {
  return (
    <Title level={4} className="entry-title">
      <Link to=''>{titleName} <RightOutlined /></Link>
    </Title>
  )
}

export default EntryTitle;