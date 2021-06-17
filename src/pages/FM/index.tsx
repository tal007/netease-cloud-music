/*
 * @Author: 刘玉田 
 * @Date: 2021-06-17 14:59:21 
 * @Last Modified by: 刘玉田
 * @Last Modified time: 2021-06-17 15:10:02
 * 私人 FM 
 ! personal_fm 每次只返回三条数据 
 ? 每次播放（选中）的都是第一首歌，待到第三首的时候就再次请求，更新数据
*/

import { CustomImage } from "components/CustomImage";
import { MusicItemProps } from "components/MusicItem";
import { PageContainer } from "components/PageContainer";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";
import { FC, useEffect, useState } from "react";

const FM: FC = () => {
  const [current, setCurrent] = useState<MusicItemProps | null>(null);
  const client = useAjax();
  const { run, isLoading, data } =
    useAsync<{
      code: number;
      data: MusicItemProps[];
      popAdjsust: boolean;
    }>();

  useEffect(() => {
    run(client("personal_fm"));
  }, [client, run]);

  useEffect(() => {
    data && setCurrent(data.data[0]);
  }, [data]);

  return (
    <PageContainer isLoading={isLoading}>
      {current && (
        <CustomImage
          width={300}
          height={300}
          url={current.album?.picUrl || ""}
        />
      )}
    </PageContainer>
  );
};

export default FM;
