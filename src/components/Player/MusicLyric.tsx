/*
 * @Author: 刘玉田
 * @Date: 2021-05-27 11:32:33
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-16 17:17:50
 * 歌词
 */

import {
  FC,
  useEffect,
  useState,
  useRef,
  useCallback,
  WheelEvent,
} from "react";
import useUrlLoader from "../../hooks/useURLLoader";
import useWindowResize from "../../hooks/useWindowResize";
import useAnimationFrame from "../../hooks/useAnimationFrame";

import { dealWithLyric, debounce } from "../../util";
import Loading from "../../components/Loading";
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
  const lyricProgressNode = useRef<HTMLDivElement | null>(null);
  const { windowInnerHeight } = useWindowResize();
  const [lyric, setLyric] = useState<Lyric[]>([]);
  const [lyricScroll, setLyricScroll] = useState<boolean>(true);
  const { ajax, loading } = useUrlLoader();

  useEffect(() => {}, []);

  useAnimationFrame(() => {
    if (container.current && lyricProgressNode.current) {
      const containerHeight = windowInnerHeight - 60;
      const halfWindowInnerHeight = containerHeight / 2;
      const passNodeList = document.querySelectorAll(".pass").length;
      const passHeight = halfWindowInnerHeight - (passNodeList * 40 + 8);
      container.current.style.transform = `translateY(${passHeight}px)`;
      const scrollBarPassHeight = (percent / 100) * (containerHeight - 50);
      lyricProgressNode.current.style.transform = `translateY(${scrollBarPassHeight}px)`;
    }
  }, runing && lyricScroll);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const scrollFn = useCallback(
    debounce(() => {
      setLyricScroll(true);
    }, 2000),
    []
  );

  const scroll = (e: WheelEvent) => {
    setLyricScroll(false);

    // if (container.current && lyricProgressNode.current) {
    //   const direction = (e.deltaY || e.detail) > 0 ? 'UP' : 'DOWN';
    //   let currentTranslateY: number | string = container.current.style.transform;
    //   currentTranslateY = parseFloat(currentTranslateY.split('(')[1]);

    //   if (direction === 'UP') {
    //     container.current.style.transform = `translateY(${currentTranslateY + 10}px)`;
    //   } else {
    //     container.current.style.transform = `translateY(${currentTranslateY - 10}px)`;
    //   }
    // }
    scrollFn();
  };

  if (loading) return <Loading />;

  return (
    <div
      className={
        hidden ? "music-lyric-container hidden" : "music-lyric-container"
      }
      style={{ height: hidden ? 0 : windowInnerHeight - 60 }}
    >
      <div
        className="lyric-container"
        ref={container}
        onWheel={(e) => scroll(e)}
      >
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
      <div className="scroll-bar">
        <div className="progress" ref={lyricProgressNode}></div>
      </div>
    </div>
  );
};

export default MusicLyric;
