/*
 * @Author: 刘玉田
 * @Date: 2021-05-27 11:32:33
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 18:22:36
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
import useWindowResize from "hooks/useWindowResize";
import useAnimationFrame from "hooks/useAnimationFrame";

import { dealWithLyric, debounce } from "util/index";
import styled from "@emotion/styled";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
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
  const [lyricScroll, setLyricScroll] = useState<boolean>(true);

  const client = useAjax();
  const { run, isLoading, data } =
    useAsync<{
      lrc: {
        lyric: string;
      };
    }>();

  useEffect(() => {
    run(client("/lyric", { data: { id } }));
  }, [client, id, run]);

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
    scrollFn();
  };

  return (
    <MusicLyricContainer
      style={{
        width: hidden ? 0 : "100%",
        height: hidden ? 0 : windowInnerHeight - 60,
      }}
    >
      <LyricContainer ref={container} onWheel={(e) => scroll(e)}>
        {data &&
          dealWithLyric(data.lrc.lyric).map((value) => {
            if (value.duration <= currentTime) {
              return <LyricDiv key={value.duration}>{value.text}</LyricDiv>;
            }
            return <LyricP key={value.duration}>{value.text}</LyricP>;
          })}
      </LyricContainer>
      <ScrollBar>
        <Progress ref={lyricProgressNode}></Progress>
      </ScrollBar>
    </MusicLyricContainer>
  );
};

export default MusicLyric;

const MusicLyricContainer = styled.div`
  position: absolute;
  left: 0;
  bottom: 100%;
  z-index: 20;

  width: 100%;
  height: 100%;
  background-color: var(--color-light);
  overflow: hidden;
  transition: height 0.3s ease;

  color: var(--text-color);
  text-align: center;
`;

const LyricContainer = styled.div`
  transform: translateY(0);
  width: 100%;

  transition: all 0.3s linear;

  div:last-of-type {
    color: var(--red);
    transform: scale(1.4);
  }
`;

const LyricDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  height: 40px;
  margin: 0;
  transition: all 0.3s linear;
`;

const LyricP = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  height: 40px;
  margin: 0;
  transition: all 0.3s linear;
`;

const ScrollBar = styled.div`
  position: absolute;
  right: 2px;
  top: 0;
  width: 8px;
  height: 100%;
`;

const Progress = styled.div`
  width: 100%;
  height: 50px;
  cursor: pointer;
  border-radius: 8px;
  background-color: var(--text-color);
  opacity: 0.2;
  transition: all 0.3s linear;
`;
