/*
 * @Author: 刘玉田 
 * @Date: 2021-06-01 18:20:00 
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-01 18:22:39
 */

import { FC } from 'react'
import { MusicItem } from './index'

const Item: FC<{music: MusicItem, i: number, musicList: MusicItem[]}> = ({
  music, i, musicList
}) => {
  return (<div>{music.name}</div>)
}

export default Item