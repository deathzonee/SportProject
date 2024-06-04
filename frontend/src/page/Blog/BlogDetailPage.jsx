import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { endpoint } from "../../utils/endpoint";
import Comment from "./components/Comment";

const BlogDetailPage = () => {
  const [blogDetail, setBlogDetail] = useState();
  const param = useParams();
  let { id } = param;
  useEffect(() => {
    const getBlogDetail = async (id) => {
      try {
        const response = await axios.get(`${endpoint}/get-blog/${id}`);
        setBlogDetail(response?.data?.data);
      } catch (error) {
        console.log("🚀 ~ getBlogDetail ~ error:", error);
      }
    };
    getBlogDetail(id);
  }, [id]);

  return (
    <div className="mt-[100px] md:px-20 px-6 flex flex-col gap-4">
      {blogDetail && (
        <>
          <img
            src={blogDetail.image}
            className="w-full h-[400px] object-cover flex-shrink-0 rounded-lg"
          ></img>
          <h1 className="font-bold text-3xl">{blogDetail.title} </h1>
          <p>{blogDetail.content}</p>
        </>
      )}

      <Comment></Comment>
    </div>
  );
};

export default BlogDetailPage;
