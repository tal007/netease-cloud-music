/*
 * @Author: 刘玉田
 * @Date: 2021-06-25 14:55:16
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-25 15:18:37
 * 指定或者但返回url中指定健的参数值
 */

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export const useUrlQueryParams = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return [
    useMemo(
      () =>
        keys.reduce((prev: {}, key: string) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = { ...Object.fromEntries(searchParams), ...params };
      return setSearchParams(o);
    },
  ] as const;
};
