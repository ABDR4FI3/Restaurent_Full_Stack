import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../Components/Footer/footer";
import Navbar from "../../Components/Nav/Navbar";
import { useProfile } from "../../Hooks/useProfile";
import FoodContainer from "../Menu/Container/FoodContainer";

const ProfilePage: React.FC = () => {
  const { error, loading, userData } = useProfile();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (userData) {
    console.log("all Data " + userData.food);
    console.log("user data food " + userData.food);
    return (
      <>
        <div className="flex flex-col gap-8 bg-dark-bg">
          <Navbar />
          {/* Image + Details */}
          <div className="flex justify-between px-20">
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
              <div className="  my-8" >
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
                  {userData?.food?.map((food, index) => (
                    <SwiperSlide key={index}>
                      <FoodContainer
                        img={food.link}
                        rating={food.rating}
                        price={food.price}
                        name={food.name}
                        onClick={() => {}}
                        
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
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
