import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../../utils/endpoint";
import Card from "./Card";

const CourseList = () => {
  const [course, setCourse] = useState();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(`${endpoint}/get-course`);
        setCourse(response?.data?.data);
      } catch (error) {
        console.log("🚀 ~ getCourse ~ error:", error);
      }
    };
    getCourse();
  }, []);

  return (
    <div className="py-5 md:px-0 px-5 grid md:grid-cols-3 grid-cols-1 gap-4">
      {course &&
        course.map((item, index) => {
          return (
            <Card
              key={index}
              image={item.image}
              name={item.name}
              price={item.price}
              item={{ ...item, id: item._id }}
              availableSeats={item.availableSeats}
              totalEnrolled={item.totalStudents}
              schedule={item.schedule}
              _id={item._id}
            />
          );
        })}
    </div>
  );
};

export default CourseList;
