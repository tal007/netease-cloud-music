import { CSSProperties, FC } from 'react';

import { Carousel, Image } from 'antd';

const Banner: FC = () => {
  return (
    <Carousel
      className="app-found-banner"
      infinite
      autoplay
      // centerMode
    >
      <div>
        <Image preview={false} src="http://p1.music.126.net/f0mLZSH2QlNdPCmxUkQ4Eg==/109951165993691744.jpg"/>
      </div>
      <div>
        <Image preview={false} src="http://p1.music.126.net/f0mLZSH2QlNdPCmxUkQ4Eg==/109951165993691744.jpg"/>
      </div>
      <div>
        <Image preview={false} src="http://p1.music.126.net/f0mLZSH2QlNdPCmxUkQ4Eg==/109951165993691744.jpg"/>
      </div>
      <div>
        <Image preview={false} src="http://p1.music.126.net/f0mLZSH2QlNdPCmxUkQ4Eg==/109951165993691744.jpg"/>
      </div>
    </Carousel>
  );
};

export default Banner;
