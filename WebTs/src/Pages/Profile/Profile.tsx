import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../Components/Footer/footer";
import Navbar from "../../Components/Nav/Navbar";
import { useProfile } from "../../Hooks/useProfile";
import FoodContainer from "../Menu/Container/FoodContainer";
import { FormattedFood } from "../../utils/foodUtils";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import Order from "./OrderComponent/Order";
const ProfilePage: React.FC = () => {
  const { error, loading, userData } = useProfile();
  const navigate = useNavigate();
    const OpenDetails = (food: FormattedFood) => {
      navigate("/details", { state: { food } });
    };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (userData) {
    console.log(userData);
    return (
      <>
        <div className="flex flex-col gap-8 bg-dark-bg">
          <Navbar />
          {/* Image + Details */}
          <div className="flex justify-between p-20">
            {/* Image */}
            <div className="border-green-500 border p-4  rounded-xl">
              <img
                src={userData.user.image}
                alt=""
                className=" w-48 rounded-full"
              />
            </div>
            {/* Name + Details*/}
            <div className="basis-2/3 flex flex-col gap-4 text-white justify-center ">
              {" "}
              <div className="flex flex-col">
                <h1 className="text-3xl text-green-500 font-bold font-montserrat">
                  {userData.user.name}
                </h1>
              </div>
              <h1 className="text-3xl font-bold font-montserrat">
                email : {userData.user.email}
              </h1>
              <h1 className="text-3xl font-bold font-montserrat">
                adress : {userData.user.address}
              </h1>
              <h1 className="text-3xl font-bold font-montserrat">
                Phone : {userData.user.phone}
              </h1>
            </div>
          </div>
          {/* Favorite Foods Slider */}
          <section className="CarouselFavourite">
            {" "}
            <div className="px-20">
              <h1 className="text-3xl text-green-500 font-bold font-montserrat ">
                Favorite Foods :
              </h1>
              <div className="my-8 " >
                <Swiper
                  spaceBetween={40}
                  slidesPerView={3}
                  freeMode={false}
                  loop={true}
                  autoplay={{ delay: 200, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  className="mySwiper"
                >
                  {userData?.food?.map((food, index) => (
                    <SwiperSlide key={index}>
                      <FoodContainer
                        img={food.link}
                        rating={food.rating}
                        price={food.price}
                        name={food.name}
                        onClick={() => {OpenDetails(food)}}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </section>
          <section className="OrdersHistory">
            <div className="px-20">
              <h1 className="text-3xl text-green-500 font-bold font-montserrat ">
                Orders History :
              </h1>
              <div className="my-8 flex flex-col gap-6 text-white OrderContainer">
                {userData?.user.cart.orders?.map((order, index) => (
                  <Order key={index} qte={order.qte} food={order.food} />
                ))}
              </div>
            </div>
          </section>
          <Footer />
        </div>
      </>
    );
  }
};
export default ProfilePage;
