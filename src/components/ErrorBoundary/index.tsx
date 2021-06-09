/*
 * @Author: 刘玉田
 * @Date: 2021-06-09 15:08:16
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-09 15:20:29
 * 错误边界捕获组件
 */

import { Typography } from "antd";
import React from "react";
import { FlexBoxCenter } from "style";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export const FullPageErrorCallback = ({ error }: { error: Error | null }) => (
  <FlexBoxCenter>
    <Typography.Text>{error?.message}</Typography.Text>
  </FlexBoxCenter>
);

// https://github.com/bvaughn/react-error-boundary
export class ErrorBoundary extends React.PureComponent<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error) return fallbackRender({ error });
    return children;
  }
}
