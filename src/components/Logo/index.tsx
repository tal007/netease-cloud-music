/*
 * @Author: 刘玉田
 * @Date: 2021-06-18 13:54:33
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-18 13:58:11
 * Logo
 */

import styled from "@emotion/styled";

export const Logo = ({ showMock = true }: { showMock?: boolean }) => {
  return (
    <LogoContainer>
      <LogoSpan backgroundColor={"#032C9E"}>E</LogoSpan>
      <LogoSpan backgroundColor={"#0E36A6"}>M</LogoSpan>
      <LogoSpan backgroundColor={"#1742BB"}>C</LogoSpan>
      <MusicText>music</MusicText>
      {showMock && <span>(Mock 网易云)</span>}
      {/* <CustomImage height={'100%'} url={logo}/> */}
    </LogoContainer>
  );
};

const LogoContainer = styled.h1`
  margin-bottom: 10rem;
  text-transform: uppercase;
  text-align: center;
  height: 6.4rem;
`;

const LogoSpan = styled.span<{
  backgroundColor?: string;
}>`
  width: 5.7rem;
  display: inline-block;
  text-align: center;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : undefined};
  color: white;
`;

const MusicText = styled.span`
  letter-spacing: 1.5rem;
  margin-left: 1rem;
`;
