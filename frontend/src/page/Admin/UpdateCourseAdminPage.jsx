import { toast } from "react-toastify";
import Button from "../../components/button/Button";
import axios from "axios";
import { endpoint } from "../../utils/endpoint";
import { useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PhotoIcon } from "../../components/icons";
import { convertBase64 } from "../../utils/uploadImage";

const UpdateCourseAdminPage = () => {
  const { control, handleSubmit } = useForm();
  const [courses, setCourses] = useState();
  const param = useParams();
  let { id } = param;
  const navigate = useNavigate();
  useEffect(() => {
    const getCourse = async (id) => {
      try {
        const response = await axios.get(`${endpoint}/get-course/${id}`);
        setCourses(response?.data?.data);
      } catch (error) {
        console.log("🚀 ~ getCourse ~ error:", error);
      }
    };
    getCourse(id);
  }, [id]);

  const [fileImage, setFileImage] = useState();
  const [fileName, setFileName] = useState();

  const updateImage = async (e) => {
    try {
      const file = e.target.files[0];
      setFileName(e.target.files[0].name);
      const base64 = await convertBase64(file);
      setFileImage(base64);
    } catch (error) {
      console.log("🚀 ~ updateImage ~ error:", error);
    }
  };

  const updateCourse = async (data, id) => {
    try {
      await axios.put(`${endpoint}/update-course/${id}`, {
        ...data,
        image: fileImage,
      });
      navigate("/admin/courses");
      toast.success(`Cập nhật thành công`);
    } catch (error) {
      toast.warning(error.response.data.message);
      console.log("🚀 ~ updateCourse ~ error:", error);
    }
  };
  return (
    <div className="h-full bg-darkColors2 px-[100px] py-10">
      <h1 className="text-white text-center font-bold text-2xl mb-4">
        Cập nhật lớp học
      </h1>
      {courses && (
        <form
          onSubmit={handleSubmit((data) => updateCourse(data, courses._id))}
        >
          <div className="flex flex-col gap-5 text-white">
            <Input
              name="image"
              control={control}
              placeholder={fileName ? fileName : courses.image}
              type="text"
              className="!pl-[25px] pr-20"
              iconCSS="right-0 top-2/3 -translate-y-2/3 -translate-x-1/2"
            >
              <label htmlFor="myfile" className="cursor-pointer">
                <PhotoIcon></PhotoIcon>
              </label>
            </Input>

            <input
              type="file"
              id="myfile"
              name="myfile"
              onChange={updateImage}
              className="hidden"
            ></input>
            <Input
              name="name"
              control={control}
              type="text"
              placeholder={"Tên"}
              defaultValue={courses.name}
              className="!pl-[25px]"
            ></Input>

            <Input
              name="availableSeats"
              control={control}
              type=" number"
              placeholder={"Chỗ còn trống"}
              defaultValue={courses.availableSeats}
              className="!pl-[25px]"
            ></Input>

            <Input
              name="price"
              control={control}
              type="number"
              placeholder={"Giá"}
              defaultValue={courses.price}
              className="!pl-[25px]"
            ></Input>

            <Input
              name="desc"
              control={control}
              placeholder={"Mô tả"}
              defaultValue={courses.desc}
              className="!pl-[25px]"
            ></Input>

            <Input
              name="totalStudents"
              control={control}
              placeholder={"Số lượng học viên"}
              defaultValue={courses.totalStudents}
              className="!pl-[25px]"
            ></Input>

            <Input
              name="schedule"
              control={control}
              placeholder={"Khung giờ"}
              defaultValue={`${courses.schedule}`}
              className="!pl-[25px]"
            ></Input>

            <Button
              type="submit"
              className=" w-full  text-bodyBold rounded-[6px] py-[9px] text-white"
              name="create-course"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateCourseAdminPage;
