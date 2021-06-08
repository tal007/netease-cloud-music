import styled from "@emotion/styled";
import { Button } from "antd";

export const FlexBoxCenter = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyButton = styled(Button)<{
  width?: number | string;
  ml?: number | string;
}>`
  background: var(--button-gradient);
  margin-left: ${(props) => (props.ml ? props.ml : undefined)};
  width: ${(props) => (props.width ? props.width : undefined)};
  height: 3.5rem;
  color: #212020;
  font-size: 1.6rem;
  text-transform: uppercase;
  border: none;
  border-radius: 10rem;
`;
