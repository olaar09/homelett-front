// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import Image from "next/image";

export default () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={6}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {[
        { icon: "/logos/openai.svg", size: "w-20" },
        { icon: "/logos/revolut.svg", size: "w-20" },
        { icon: "/logos/spotify.svg", size: "w-20" },
        { icon: "/logos/stripe.svg", size: "w-20" },
        { icon: "/logos/paystack.svg", size: "w-40" },
        { icon: "/logos/flutterwave.png", size: "w-44" },
        { icon: "/logos/netflix.svg", size: "w-20" },
        { icon: "/logos/slack.svg", size: "w-20" },
        { icon: "/logos/aws.svg", size: "w-14" },
        { icon: "/logos/openai.svg", size: "w-20" },
      ].map((val) => (
        <SwiperSlide>
          <div className="h-12  rounded-lg flex items-center justify-center">
            <Image
              className={val.size}
              src={`${val.icon}`}
              alt={`${val.icon}`}
              width={300}
              height={300}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
