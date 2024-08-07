import { RiSingleQuotesL, RiSingleQuotesR } from "react-icons/ri";
import { Comments } from "../../../types/Comments";

interface CommentsProps {
  comments: Comments;
}
const Comment: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <div className="flex justify-between p-8 border rounded-xl ">
      {/*name and content*/}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold font-montserrat">
          {comments.user.name}
        </h1>
        <div className="flex">
          {" "}
          <RiSingleQuotesL />
          <p className="text-xl font-josefin">{comments.content}</p>
          <RiSingleQuotesR />
        </div>
      </div>
      {/*image*/}
      <div className="flex justify-end items-end">
        {comments.user.image && (
          <img src={comments.user.image} className="w-24 rounded-full" alt="" />
        )}
      </div>
    </div>
  );
};
export default Comment;
