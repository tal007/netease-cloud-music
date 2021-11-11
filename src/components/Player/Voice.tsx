/*
 * @Author: 刘玉田
 * @Date: 2021-06-28 11:08:38
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-28 14:54:07
 * 音量
 */

import styled from "@emotion/styled";
import MyIcon from "Icons";
import { FC, useEffect, useRef } from "react";

const height = 100;

export const Vioce: FC<{
  audioNode: React.MutableRefObject<HTMLAudioElement | null>;
}> = ({ audioNode }) => {
  const dotNode = useRef<HTMLDivElement | null>(null);
  const voiceProgressNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (dotNode.current) {
      const node = dotNode.current;
      let y = 0;
      let status = false;
      node.addEventListener("mousedown", (e) => {
        y = e.pageY;
        status = true;
      });

      node.parentElement?.parentElement?.addEventListener("mousemove", (e) => {
        if (status) {
          const newY = e.pageY;
          let diffY = newY - y;
          if (diffY < 0) diffY = 0;
          if (diffY > height) diffY = height - 12;

          const percent =
            diffY / 88 <= 0 ? 0 : diffY / 88 >= 1 ? 1 : diffY / 88;

          if (voiceProgressNode.current) {
            voiceProgressNode.current.style.height = `${100 - percent * 100}%`;
            if (audioNode.current) {
              audioNode.current.volume = 1 - percent;
            }
          }
        }
      });

      window.addEventListener("mouseup", () => {
        status = false;
      });
    }
  }, []);

  // 静音设置
  const handleClick = () => {
    if (audioNode.current) {
      if (audioNode.current.muted) {
        audioNode.current.muted = false;
      } else {
        audioNode.current.muted = true;
      }
    }
  };

  // 音量拖动

  return (
    <VoiceContainer>
      <MyIcon
        type={audioNode.current?.muted ? "icon-jingyin" : "icon-yinliang"}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      />
      <VoiceProgress className={"vioce-progress"}>
        <VoiceProgressInner ref={voiceProgressNode}>
          <Dot ref={dotNode} />
        </VoiceProgressInner>
      </VoiceProgress>
    </VoiceContainer>
  );
};

const VoiceContainer = styled.div`
  position: relative;
  &:hover {
    .vioce-progress {
      display: block;
    }
  }
`;

const VoiceProgress = styled.div`
  position: absolute;
  left: 0;
  bottom: 100%;
  /* background: var(--light-gradient); */
  background: white;
  width: 100%;
  height: 100px;
  /* display: none; */
  padding: 6px;
  box-sizing: border-box;
  border-radius: 3px;
`;

const VoiceProgressInner = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 20%;
  transform: translateX(-50%);
  height: 100%;
  background: red;
`;

const Dot = styled.div`
  position: absolute;
  top: -4px;
  left: 50%;
  width: 8px;
  height: 8px;
  transform: translateX(-50%);
  border-radius: 50%;
  background-color: blue;

  cursor: pointer;
`;
