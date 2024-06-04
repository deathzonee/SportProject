import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dateFormat from "dateformat";
import { endpoint } from "../../../utils/endpoint";
import ButtonCard from "../../Courses/components/ButtonCard";
const BlogList = () => {
  const [blogs, setBlogs] = useState();
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await axios.get(`${endpoint}/get-blogs`);
        setBlogs(response?.data?.data);
      } catch (error) {
        console.log("🚀 ~ getBlogs ~ error:", error);
      }
    };
    getBlogs();
  }, []);
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-6">
      {blogs &&
        blogs.length > 0 &&
        blogs.map((blog) => {
          return (
            <div
              key={blog._id}
              className="bg-[#EEF9FF] rounded-xl overflow-hidden"
            >
              <img
                src={blog.image}
                className="w-full h-[238px] object-cover flex-shrink-0 rounded-lg overflow-hidden"
              ></img>
              <div className="px-5 py-5 flex flex-col gap-3">
                <div className="flex justify-between">
                  <h3 className="font-bold">
                    Tác giả: <span className="font-normal">{blog.author}</span>
                  </h3>
                  <span>{dateFormat(`${blog.createdAt}`, "dd/MM/yyyy")}</span>
                </div>
                <h1 className="font-bold text-2xl line-clamp-1">
                  {blog.title}
                </h1>
                <p className="line-clamp-3">{blog.content}</p>
                <Link
                  to={`/blog-detail/${blog._id}`}
                  className="text-[#06A3DA] cursor-pointer"
                >
                  <ButtonCard>XEM CHI TIẾT</ButtonCard>
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default BlogList;
