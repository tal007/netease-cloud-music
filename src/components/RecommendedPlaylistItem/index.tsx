/*
 * @Author: 刘玉田 
 * @Date: 2021-05-24 10:58:39 
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-24 14:06:13
 */

import './index.less'
import { FC } from 'react'
import { Image, Col } from 'antd'

const RecommendedPlaylistItem: FC<{name: string, imageUrl: string, span?: number}> = ({name, imageUrl, span=6}) => {
  return (
    <Col className="recommended-playlist-item gutter-row" span={span} md={6} xl={4}>
      <Image preview={false} src={imageUrl}/>
      {name}
    </Col>
  )
}

export default RecommendedPlaylistItem