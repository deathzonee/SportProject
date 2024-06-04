import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../../utils/endpoint";
import CardInstructor from "./CardInstructor";
const PopularInstructor = () => {
  const [instructor, setInstructor] = useState();
  useEffect(() => {
    const getInstructor = async () => {
      try {
        const response = await axios.get(`${endpoint}/get-instructor`);
        setInstructor(response?.data?.message);
      } catch (error) {
        console.log("🚀 ~ getCourse ~ error:", error);
      }
    };
    getInstructor();
  }, []);
  return (
    <div className="md:w-[80%] mx-auto my-36">
      <div>
        <h1 className="text-5xl font-bold text-center">
          Các HLV
          <span className="text-secondary"> nổi bật</span> của chúng tôi
        </h1>
        <div className="w-[40%] text-center mx-auto my-4">
          <p className="text-gray-500">Khám phá các HlV nổi bật</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-8 w-[90%] mx-auto">
        {instructor &&
          instructor?.map((item) => {
            return (
              <CardInstructor
                key={item._id}
                img={item.image}
                name={item.name}
                totalStudent={item.totalStudent}
              ></CardInstructor>
            );
          })}
      </div>
    </div>
  );
};

export default PopularInstructor;
