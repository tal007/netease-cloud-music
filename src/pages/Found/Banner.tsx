import { FC, useEffect, useState } from 'react';
import { Carousel, Image } from 'antd';

import useUrlLoader from '../../hooks/useURLLoader';
import Loading from '../../components/Loading';

type Banners = Banner[];
interface BannerResponse {
  banners: Banners;
}

const Banner: FC = () => {
  const { ajax, loading } = useUrlLoader();
  const [banners, setBanners] = useState<Banners>([]);

  useEffect(() => {
    ajax<BannerResponse>('/banner', 'GET', {})
      .then((response) => {
        setBanners(response.banners);
      })
      .catch((error) => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return (
      <Loading></Loading>
  );

  return (
    <div className="app-found-banner">
      <Carousel
        infinite
        autoplay
        // centerMode
      >
        {banners.map((banner) => (
          <Image preview={false} src={banner.imageUrl} key={banner.targetId} />
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
