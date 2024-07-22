import repeatStars from "../../../utils/repeatStars";

interface FoodContainerProps {
  img: string;
  rating: number;
  price: number;
  name: string;
}

const FoodContainer: React.FC<FoodContainerProps> = ({
  img,
  rating,
  price,
  name,
}) => {
  return (
    <>
      <div
        className=" flex flex-col gap-3 bg-white rounded-lg shadow-xl p-4 text-black "
        style={{ fontFamily: "LibreBodoni" }}
      >
        <div>
          {" "}
          <img src={img} className="h-52 w-full rounded-lg" alt="" />
          <div className="flex justify-between text-2xl">
            {" "}
            <h1>{name}</h1>
            <h1>${price}</h1>
          </div>
        </div>
        <div className="text-lg"> rating : {repeatStars(rating)}</div>
      </div>
    </>
  );
};

export default FoodContainer;
