import CardCourse from "./CardCourse";
import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../../utils/endpoint";

const PopularCourses = () => {
  const [course, setcourse] = useState();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(`${endpoint}/get-course`);
        setcourse(response?.data?.data);
      } catch (error) {
        console.log("🚀 ~ getCourse ~ error:", error);
      }
    };
    getCourse();
  }, []);
  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Các câu lạc bộ
          <span className="text-secondary"> nổi bật</span> của chúng tôi
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-500">Khám phá các câu clb</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1">
        {course &&
          course?.map((item) => {
            return (
              <CardCourse
                key={item._id}
                image={item.image}
                name={item.name}
                availableSeats={item.availableSeats}
                price={item.price}
                totalEnrolled={item.totalStudents}
                schedule={item.schedule}
              ></CardCourse>
            );
          })}
      </div>
    </div>
  );
};

export default PopularCourses;
