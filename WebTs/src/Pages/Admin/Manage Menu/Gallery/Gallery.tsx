import { FormattedFood } from "../../../../utils/foodUtils";

interface GalleryProps {
  food: FormattedFood ;
}
const Gallery: React.FC<GalleryProps> = ({ food }) => {
  console.log("my full food object", food);
  console.log("my food object", food?.carouselImage.links);
  console.log("my food image", food?.link);

  return (
    <div className="bg-gray-200 p-8 rounded-lg shadow-2xl">
      <div className="text-3xl font-libre">Gallery :</div>
      <div className="grid grid-cols-3 gap-5 my-8">
        {food?.carouselImage.links.map((link, index) => (
          <img
            key={index}
            src={link}
            alt={`Carousel image ${index}`}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};
export default Gallery;
