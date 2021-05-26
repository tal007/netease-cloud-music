/*
 * @Author: 刘玉田
 * @Date: 2021-05-25 15:15:43
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-26 14:35:26
 * 音乐名字处理
 */

import './index.less';
import { FC } from 'react';
import { mySubString } from '../../util'

const MusicName: FC<{ name: string; alia: string[] }> = ({ name, alia }) => {
  return (
    <div className="music-name">
      {name} {' '}
      {name.length < 10 && (
        <span className="alia">
          {alia[0] &&
            (alia[0].length < 10
              ? `(${alia[0]})`
              : `(${alia[0].slice(0, 12 - name.length)}...`)}
        </span>
      )}
    </div>
  );
};

export default MusicName;
