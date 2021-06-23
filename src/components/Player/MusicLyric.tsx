/*
 * @Author: 刘玉田
 * @Date: 2021-05-27 11:32:33
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-23 16:19:21
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
import { PageContainer } from "components/PageContainer";
import { FlexBoxCenter } from "style";
import { CustomImage } from "components/CustomImage";
import MyIcon from "Icons";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { MusicItemProps } from "types/musicItem";
import { useQuery } from "react-query";

// TODO 这个页面图片不对

const MusicLyric: FC<{
  id: number | string;
  music: MusicItemProps;
  setHiddenLyric: React.Dispatch<React.SetStateAction<boolean>>;
  hidden: boolean;
  currentTime: number;
  percent: number;
  runing: boolean;
}> = ({ id, hidden, currentTime, percent, runing, music, setHiddenLyric }) => {
  const container = useRef<HTMLDivElement | null>(null);
  const lyricProgressNode = useRef<HTMLDivElement | null>(null);
  const { windowInnerHeight } = useWindowResize();
  const [lyricScroll, setLyricScroll] = useState<boolean>(true);

  const client = useAjax();
  const { isLoading, error, data } = useQuery<
    { lrc: { lyric: string } },
    Error
  >(["lyric", { id }], () => client("/lyric", { data: { id } }));

  useAnimationFrame(() => {
    if (container.current && lyricProgressNode.current) {
      const containerHeight = windowInnerHeight - 60;
      const halfWindowInnerHeight = containerHeight / 2;
      const passNodeList = container.current.querySelectorAll("div").length;
      const passHeight = halfWindowInnerHeight - (passNodeList * 40 + 8);
      container.current.style.transform = `translateY(${passHeight}px)`;
      const scrollBarPassHeight = (percent / 100) * (containerHeight - 50);
      lyricProgressNode.current.style.transform = `translateY(${scrollBarPassHeight}px)`;
    }
  }, runing && lyricScroll);

  const scrollFn = useCallback(() => {
    debounce(() => {
      setLyricScroll(true);
    }, 2000);
  }, []);

  const lyricArray = useCallback(() => {
    return dealWithLyric(data?.lrc.lyric || "");
  }, [data?.lrc.lyric]);

  return (
    <Fullscreen
      style={{
        height: hidden ? 0 : "100vh",
      }}
    >
      <CloseIcon type="icon-scale1" onClick={() => setHiddenLyric(true)} />
      <PageContainer isLoading={isLoading} error={error}>
        <FlexBoxCenter>
          <div>
            <CustomImage
              width={300}
              height={300}
              url={music.al?.picUrl || ""}
            />
            <Typography.Title level={2}>{music.name}</Typography.Title>
            <Typography.Title level={4}>
              {music.ar && (
                <Link to={`/artists/${music.ar[0].id}`}>
                  {music.ar[0].name}
                </Link>
              )}
            </Typography.Title>
          </div>
          <MusicLyricContainer>
            <LyricContainer ref={container}>
              {data &&
                lyricArray().map((value, index) => {
                  if (value.duration <= currentTime) {
                    return <LyricDiv key={value.time}>{value.text}</LyricDiv>;
                  }
                  return <LyricP key={value.time}>{value.text}</LyricP>;
                })}
            </LyricContainer>
            <ScrollBar>
              <Progress ref={lyricProgressNode}></Progress>
            </ScrollBar>
          </MusicLyricContainer>
        </FlexBoxCenter>
      </PageContainer>
    </Fullscreen>
  );
};

export default MusicLyric;

const Fullscreen = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background: var(--light-gradient);
  transition: all 0.3s linear;
  overflow: hidden;
`;

const CloseIcon = styled(MyIcon)`
  position: absolute;
  right: 2rem;
  top: 2rem;
  cursor: pointer;
  font-size: 30px;
  z-index: 998;

  &:hover {
    animation: scale 3s linear infinite;
  }

  @keyframes scale {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(0.8);
    }
    75% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

const MusicLyricContainer = styled.div`
  width: 60%;
  height: 60%;
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
