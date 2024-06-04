import { useForm } from "react-hook-form";
import Textarea from "../../../components/textarea/Textarea";
import Tag from "./Tag";
import Button from "../../../components/button/Button";
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../../utils/endpoint";
import dateFormat from "dateformat";
import { toast } from "react-toastify";
const Comment = () => {
  const { control, handleSubmit, reset } = useForm();
  const [comments, setComments] = useState([]);
  const getComments = async () => {
    try {
      const response = await axios.get(`${endpoint}/get-comments`);
      setComments(response?.data?.data);
    } catch (error) {
      console.log("🚀 ~ getComments ~ error:", error);
    }
  };
  useEffect(() => {
    getComments();
  }, []);
  const createComment = async (data) => {
    try {
      await axios.post(`${endpoint}/create-comment`, data);
      getComments();
      reset({
        name: "",
        email: "",
        comment: "",
      });
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#EEF9FF] px-5 py-7 rounded-xl">
        <h3 className="font-bold text-xl">Bình luận</h3>
        <div className="flex flex-col gap-4 ">
          {comments &&
            comments.length > 0 &&
            comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <div className="flex items-center gap-3">
                    <h3 className="text-[#06A3DA]">{comment.name}</h3>
                    <span>{dateFormat(comment.createdAt, "dd mmm yy")}</span>
                  </div>
                  <p>{comment.comment}</p>
                </div>
              );
            })}
        </div>
      </div>

      <form
        onSubmit={handleSubmit(createComment)}
        className="bg-[#EEF9FF] rounded-xl px-5 py-7 flex flex-col gap-5"
      >
        <h1 className="font-bold text-xl">Viết bình luận</h1>
        <div className="flex items-center gap-2">
          <Tag
            name="name"
            placeholder="Tên của bạn"
            id="name"
            control={control}
          ></Tag>

          <Tag
            name="email"
            placeholder="Email của bạn"
            id="email"
            control={control}
          ></Tag>
        </div>
        <Textarea
          name="comment"
          placeholder="Bình luận"
          id="comment"
          control={control}
          className="px-3 py-3"
        ></Textarea>

        <Button type="submit" className="bg-[#06A3DA] text-white py-3">
          Bình luận
        </Button>
      </form>
    </div>
  );
};

export default Comment;
