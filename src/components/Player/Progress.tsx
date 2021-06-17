/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 17:21:04
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 18:24:21
 * 播放进度
 */

import styled from "@emotion/styled";
import { FC } from "react";

const Progress: FC<{
  current: number;
  total?: number;
  audio?: HTMLAudioElement | null;
}> = ({ current, total = 100, audio }) => {
  const handleMouseMove = () => {
    if (audio) {
      audio.currentTime = 100;
    }
  };

  return (
    <ProgressContainer>
      <Current style={{ width: current + "%" }}>
        {Boolean(current) && <Dot onMouseMove={handleMouseMove} />}
      </Current>
    </ProgressContainer>
  );
};

export default Progress;

const ProgressContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: #747474;
`;

const Current = styled.div`
  position: relative;
  height: 100%;
  background-image: var(--button-gradient);
  transition: width linear 0.3;
`;

const Dot = styled.div`
  position: absolute;
  right: 0;
  z-index: 99;
  top: 50%;
  width: 1rem;
  height: 1rem;
  background: #ffffff;
  border-radius: 50%;
  transform: translateY(-50%) translateX(0.5rem);
  cursor: pointer;
`;
