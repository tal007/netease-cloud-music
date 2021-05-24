/*
 * @Author: 刘玉田 
 * @Date: 2021-05-24 17:21:04 
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-24 18:01:37
 * 播放进度
 */

import { FC } from 'react'

const Progress: FC<{current: number, total?: number, audio?: HTMLAudioElement | null}> = ({
  current,
  total = 100,
  audio
}) => {
  const handleMouseMove = () => {
    if (audio) {
      audio.currentTime = 100
    }
  }
  
  return (
    <div className="play-progress">
      <div className="current" style={{width: current + '%'}}>
        {Boolean(current) && <div onMouseMove={handleMouseMove} className="dot"></div>}
      </div>
    </div>
  )
}

export default Progress