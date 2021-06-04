/*
 * @Author: 刘玉田
 * @Date: 2021-05-24 10:42:58
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-04 18:32:16
 * 带 Link 的模块导航 Title
 */

import { FC } from "react";
import { RightOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

const { Title } = Typography;
const EntryTitle: FC<{ titleName: string; to?: string }> = ({
  titleName,
  to = "",
}) => {
  return (
    <MyTitle level={4}>
      <Link to={to}>
        {titleName} <RightOutlined />
      </Link>
    </MyTitle>
  );
};

export default EntryTitle;

const MyTitle = styled(Title)`
  color: var(--text-color);

  a {
    color: var(--text-color);
  }
`;
