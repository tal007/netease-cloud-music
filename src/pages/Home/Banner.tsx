import { FC, useEffect } from "react";
import { Carousel, Image } from "antd";

import Loading from "../../components/Loading";
import { useAjax } from "hooks/useAjax";
import { useAsync } from "hooks/useAsync";

type Banners = Banner[];

const Banner: FC = () => {
  const client = useAjax();
  const { run, data: banners, isLoading } = useAsync<{ banners: Banners }>();

  useEffect(() => {
    run(client("/banner"));
  }, [client, run]);

  if (isLoading) return <Loading></Loading>;

  return (
    <div>
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
