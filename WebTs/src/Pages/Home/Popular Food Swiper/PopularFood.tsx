import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination"; // Import pagination styles if used
import "swiper/css/navigation"; // Import navigation styles if used
import FoodContainer from "../Popular food/FoodContainer";
import "./PopularFood.css";

const PopularFoodSwiper: React.FC = () => {
  return (
    <div className="swiper-container" style={{ width: "1400px" }}>
      <Swiper
        spaceBetween={10}
        slidesPerView={4}
        freeMode={false}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="mySwiper"
      >
        <SwiperSlide>
          <FoodContainer
            img="https://i.postimg.cc/d3FGRQ2F/pizza1.jpg"
            rating={4.5}
            price={10}
            name="pizza"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FoodContainer
            img="https://i.postimg.cc/fLfVNcd4/ramen2.jpg"
            rating={3.5}
            price={20}
            name="Ramen"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FoodContainer
            img="https://i.postimg.cc/T3jMQtvX/taco.jpg"
            rating={4.5}
            price={15}
            name="taco"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FoodContainer
            img="https://i.postimg.cc/YCTGfq7P/pasta.jpg"
            rating={4.5}
            price={10}
            name="pasta"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FoodContainer
            img="https://i.postimg.cc/YCTGfq7P/pasta.jpg"
            rating={4.5}
            price={10}
            name="pasta"
          />
        </SwiperSlide>
        <SwiperSlide>
          <FoodContainer
            img="https://i.postimg.cc/YCTGfq7P/pasta.jpg"
            rating={4.5}
            price={10}
            name="pasta"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default PopularFoodSwiper;
