import { FormattedFood } from "../../../../utils/foodUtils";

interface GalleryProps {
  food: FormattedFood | undefined;
}
const Gallery: React.FC<GalleryProps> = ({ food }) => {
  console.log("my food object", food?.carouselImage[0].links[0]);
  console.log("my food image", food?.link);

  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-2xl">
      <div className="text-3xl font-libre">Gallery :</div>
      <div className="grid grid-cols-3 gap-5 my-8">
        <img src={food?.carouselImage[0].links[0]} alt="" className="w-full" />
        <img src={food?.carouselImage[0].links[1]} alt="" className="w-full" />
        <img src={food?.carouselImage[0].links[2]} alt="" className="w-full" />
      </div>
    </div>
  );
};
export default Gallery;
