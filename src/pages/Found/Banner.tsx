import { FC } from "react";
import { Carousel, Image } from "antd";

import Loading from "../../components/Loading";
import { useAjax } from "ajax";
import { useAsync } from "hooks/useAsync";
import { useMount } from "hooks/useMount";

type Banners = Banner[];

const Banner: FC = () => {
  const client = useAjax();
  const { run, data: banners, isLoading } = useAsync<{ banners: Banners }>();

  useMount(() => {
    run(client("/banner"));
  });

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="app-found-banner">
      <Carousel
        infinite
        autoplay
        // centerMode
      >
        {banners &&
          banners.banners.map((banner) => (
            <Image
              preview={false}
              src={banner.imageUrl}
              key={banner.targetId}
            />
          ))}
      </Carousel>
    </div>
  );
};

export default Banner;
