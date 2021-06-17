/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 15:12:20
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 10:26:12
 * 搜索头部
 */

import styled from "@emotion/styled";
import { Input, Image, Typography } from "antd";
import { FC } from "react";
import logo from "assets/img/logo.svg";
import { FlexBoxCenter } from "style";

const SearchHeader: FC = () => {
  return (
    <Container>
      {/* <Input prefix={<UserOutlined />}/> */}
      <Input.Search
        placeholder="搜索一下吧"
        enterButton
        style={{ width: "60%", maxWidth: "40rem" }}
      />
      <FlexBoxCenter>
        <Image src={logo} preview={false} height={"3.2rem"} width={"3.2rem"} />
        <Typography.Text style={{ color: "#FFF", marginLeft: "1rem" }}>
          聆听音乐
        </Typography.Text>
      </FlexBoxCenter>
    </Container>
  );
};

export default SearchHeader;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  color: #fff;
`;
