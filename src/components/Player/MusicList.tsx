/*
 * @Author: 刘玉田 
 * @Date: 2021-05-25 14:34:24 
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-25 15:42:48
 * 播放列表
 */

import { FC, useEffect, useState} from 'react'
import Pubsub from 'pubsub-js'
import { Avatar, Image } from 'antd'

import { MUISCLIST } from '../../constant';
import { fillNumber } from '../../util'
import useWindowResize from '../../hooks/useWindowResize'
import MusicName from '../../components/MusicName'

const MusicItem: FC<{music: MusicItem, i: number}> = ({music, i}) => {
  return <li className="music-list-item">
    <span className="index">{fillNumber(i + 1)}</span>
    <Avatar className="img" shape="square" icon={<Image preview={false} src={music.picUrl} />}/>
    <MusicName name={music.name} alia={music.song.alias}/>
  </li>
}

const MusicList: FC<{hidden: boolean}> = ({hidden}) => {
  const [musicList, setMusicList] = useState<MusicList>([]);

  const { windowInnerHeight } = useWindowResize();

  useEffect(() => {
    Pubsub.subscribe(MUISCLIST, (msg: string, data: MusicList) => {
      console.log('MusicList', data);
      setMusicList(data)
    })
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  
  return (
    <div className={hidden ? `muisc-list-container hidden` : 'muisc-list-container'} style={{height: windowInnerHeight - 60}}>
      <ul className="music-list">
        {
          musicList.map((music, index) => <MusicItem i={index} music={music}/>)
        }
      </ul>
    </div>
  )
}

export default MusicList