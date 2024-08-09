import { FaQuoteLeft } from "react-icons/fa";
import repeatStars from "../../../utils/repeatStars";
import "./Testimonial.css"
interface TestimonialProps {
  name: string;
  text: string;
  stars: number;
  img: string;
}
const Testimonial: React.FC<TestimonialProps> = ({
  img,
  name,
  text,
  stars,
}) => {
  return (
    <>
      <div className="flex w-4/12 flex-col justify-center my-20 ">
        {/* Image Section */}
        <div className="flex flex-col border ">
          <div className="flex gap-20 justify-between border-b p-10 items-center">
            <FaQuoteLeft size={80} />
            <p> {repeatStars(stars)}</p>
          </div>

          {/* Text Section */}

          <div className="flex justify-center items-center p-10 border-b">
            <p className="text-2xl SecondPolice ellipsis "> {text}</p>
          </div>

          {/* Name Section */}
          <div className="flex justify-between  items-center p-10">
            <p className="text-2xl SecondPolice"> {name}</p>
            <img src={img} className="w-24 rounded-full" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Testimonial;
