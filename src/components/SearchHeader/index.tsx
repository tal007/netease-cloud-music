/*
 * @Author: 刘玉田
 * @Date: 2021-06-01 15:12:20
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-25 15:35:50
 * 搜索头部
 */

import styled from "@emotion/styled";
import { Input, Image, Typography } from "antd";
import { FC } from "react";
import logo from "assets/img/logo.svg";
import { FlexBoxCenter } from "style";
import { usePathname } from "hooks/usePathname";
import { Link } from "react-router-dom";
import { searchText, searchTextActions } from "store/searchText.slice";
import { useDispatch, useSelector } from "react-redux";

const SearchHeader: FC = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const keywords = useSelector(searchText);

  const onSearch = (value: string) => {
    dispatch(searchTextActions.setKeyword(value));
  };

  return (
    <Container>
      <FlexBoxCenter>
        <Image src={logo} preview={false} height={"3.2rem"} width={"3.2rem"} />
        <Typography.Text
          style={{ color: "#FFF", marginLeft: "1rem", marginRight: "5rem" }}
        >
          聆听音乐
        </Typography.Text>
      </FlexBoxCenter>
      {pathname === "/search" ? (
        <Input.Search
          placeholder="搜索一下吧"
          enterButton
          defaultValue={keywords}
          style={{ width: "60%", maxWidth: "40rem" }}
          onSearch={onSearch}
        />
      ) : (
        <Link to="/search">在这里，发现你想要的。点击前往</Link>
      )}
    </Container>
  );
};

export default SearchHeader;

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  color: #fff;
`;
