import styled from "@emotion/styled";
import { Button, PageHeader } from "antd";

export const FlexBoxCenter = styled.div<{
  height?: string;
}>`
  height: ${(props) => (props.height ? props.height : "100%")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyPageHeader = styled(PageHeader)<{
  color?: string;
}>`
  color: ${(props) => (props.color ? props.color : "#FFF")};
  .ant-page-header-heading-title {
    color: inherit;
  }
  .ant-page-header-heading-sub-title {
    color: inherit;
    opacity: 0.45;
  }
`;

export const MyButton = styled(Button)`
  background: var(--button-gradient);
  height: 3.5rem;
  color: #212020;
  font-size: 1.6rem;
  text-transform: uppercase;
  border: none;
  border-radius: 10rem;

  &:hover,
  &:focus,
  &:active {
    color: #212020;
    background: var(--button-gradient);
  }
`;
