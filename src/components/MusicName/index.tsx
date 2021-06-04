/*
 * @Author: 刘玉田
 * @Date: 2021-05-25 15:15:43
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-04 18:19:45
 * 音乐名字处理
 */

import { FC } from "react";
import { mySubString } from "../../util";
import styled from "@emotion/styled";

const MusicName: FC<{ name: string; alia: string[] }> = ({ name, alia }) => {
  return (
    <Container>
      {mySubString(name, 35)}{" "}
      {name.length < 10 && (
        <Alia className="alia">
          {alia[0] &&
            (alia[0].length < 10
              ? `(${alia[0]})`
              : `(${alia[0].slice(0, 12 - name.length)}...`)}
        </Alia>
      )}
    </Container>
  );
};

export default MusicName;

const Container = styled.div`
  color: var(--text-color);
`;

const Alia = styled.span`
  color: var(--gray-text-color);
`;
