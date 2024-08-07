import repeatStars from "../../../utils/repeatStars";

interface FoodContainerProps {
  img: string;
  rating: number;
  price: number;
  name: string;
  onClick: () => void;
}

const FoodContainer: React.FC<FoodContainerProps> = ({
  img,
  rating,
  price,
  name,
  onClick
}) => {
  return (
    <>
      <div
        className="flex flex-col gap-2 rounded-lg shadow-xl p-4 text-white bg-wood hover:bg-lightwood hover:scale-110 duration-500"
        style={{ fontFamily: "LibreBodoni" }}
        onClick={() => {onClick()}}
      >
        <div className="flex justify-center items-center h-full">
          <img
            src={img}
            className="w-full rounded-lg mb-2 object-fill"
            alt=""
          />
        </div>
        <div className="flex flex-col gap-4 flex-grow justify-end">
          <div className="flex justify-between text-2xl">
            <h1>{name}</h1>
            <h1>${price}</h1>
          </div>
          <div className="text-lg">rating: {repeatStars(rating)}</div>
        </div>
      </div>
    </>
  );
};

export default FoodContainer;
