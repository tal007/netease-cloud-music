import { FC } from "react";
import { Carousel, Image } from "antd";

import { useAjax } from "hooks/useAjax";
import { BannerProps } from "types/banner";
import { useQuery } from "react-query";
import { PageContainer } from "components/PageContainer";

const Banner: FC = () => {
  const client = useAjax();

  const { data, isLoading, error } = useQuery<
    { banners: BannerProps[] },
    Error
  >("banner", () => client("/banner"));

  return (
    <PageContainer isLoading={isLoading} error={error}>
      <div>
        <Carousel
          infinite
          autoplay
          // centerMode
        >
          {data &&
            data.banners.map((banner) => (
              <Image
                preview={false}
                src={banner.imageUrl}
                key={banner.targetId}
              />
            ))}
        </Carousel>
      </div>
    </PageContainer>
  );
};

export default Banner;
