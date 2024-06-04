import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint } from "../../utils/endpoint";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CardInstructor from "../Home/popularTeacher/CardInstructor";
const CourseDetailStyled = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 46.1875em) {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
const CourseDetailPage = () => {
  const [courseDetail, setCourseDetail] = useState();
  const param = useParams();
  let { id } = param;
  useEffect(() => {
    const getCourseDetail = async (id) => {
      try {
        const response = await axios.get(`${endpoint}/get-course/${id}`);
        setCourseDetail(response?.data?.data);
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
      }
    };
    getCourseDetail(id);
  }, [id]);
  return (
    <div className="mt-20 pt-3 md:px-20 px-6 pb-10">
      {courseDetail && (
        <CourseDetailStyled>
          <div className="flex flex-col w-full">
            <img
              src={courseDetail.image}
              className="w-full h-80 rounded-[10px] object-cover mb-5"
            ></img>
            <h1 className="text-heding1Black font-medium">
              {courseDetail.name}
            </h1>
            <div className="flex flex-col gap-4 mb-4">
              <h2 className="text-secondary text-heading2Bold font-medium text-center">
                Danh sách huấn luyện viên
              </h2>
              <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
                {courseDetail.instructors.length > 0
                  ? courseDetail.instructors.map((instructor) => (
                      <CardInstructor
                        key={instructor._id}
                        name={instructor.name}
                        img={instructor.image}
                      ></CardInstructor>
                    ))
                  : ""}
              </div>
            </div>
            <span>Khung giờ: {courseDetail.schedule}h</span>
            <span>Số lượng học viên: {courseDetail.totalStudents}</span>
            <p>Mô tả:{courseDetail.desc}</p>
          </div>
        </CourseDetailStyled>
      )}
    </div>
  );
};

export default CourseDetailPage;
