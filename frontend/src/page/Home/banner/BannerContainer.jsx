import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Banner from "./Banner";
const BannerContainer = () => {
  return (
    <section>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        className="mySwiper5"
        loop={true}
        autoplay={{
          delay: 250,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Banner></Banner>
        </SwiperSlide>
        <SwiperSlide>
          <Banner></Banner>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default BannerContainer;
