/*
 * @Author: 刘玉田
 * @Date: 2021-05-27 11:32:33
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-05-27 17:43:04
 * 歌词
 */

import { FC, useEffect, useState, useRef } from 'react';
import useUrlLoader from '../../hooks/useURLLoader';
import useWindowResize from '../../hooks/useWindowResize';
import useAnimationFrame from '../../hooks/useAnimationFrame';

import { dealWithLyric, debounce } from '../../util';
import Loading from '../../components/Loading';

interface LyricResponse {
  lrc: {
    lyric: string;
  };
}

const MusicLyric: FC<{
  id: number | string;
  hidden: boolean;
  currentTime: number;
  percent: number;
  runing: boolean;
}> = ({ id, hidden, currentTime, percent, runing }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const { windowInnerHeight } = useWindowResize();
  const [lyric, setLyric] = useState<Lyric[]>([]);
  const [lyricScroll, setLyricScroll] = useState<boolean>(true);
  const { ajax, loading } = useUrlLoader();

  useEffect(() => {
    ajax<LyricResponse>(`lyric?id=${id}`, 'GET')
      .then((response) => {
        setLyric(dealWithLyric(response.lrc.lyric));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useAnimationFrame(() => {
    if (container.current) {
      const halfWindowInnerHeight = (windowInnerHeight - 60) / 2;
      const passNodeList = document.querySelectorAll('.pass').length;
      container.current.style.top = halfWindowInnerHeight - (passNodeList * 40 + 8) + 'px';
    }
  }, runing && lyricScroll);

  // TODO 这里这个 e 的类型
  const scrollFn = () => {
    console.log(123);
  }
  const scroll = debounce(scrollFn, 1000)

  if (loading) return <Loading />;

  return (
    <div
      className={
        hidden ? 'music-lyric-container hidden' : 'music-lyric-container'
      }
      style={{ height: windowInnerHeight - 60 }}
      onScroll={() => scroll()}
    >
      <div className="lyric-container" ref={container}>
        {lyric.map((value) => {
          if (value.duration <= currentTime) {
            return (
              <div key={value.duration} className="lyric pass">
                {value.text}
              </div>
            );
          }
          return (
            <p key={value.duration} className="lyric">
              {value.text}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default MusicLyric;
