import { useForm } from "react-hook-form";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import axios from "axios";
import { endpoint } from "../utils/endpoint";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { PhotoIcon } from "../components/icons";
import { useState } from "react";
import { convertBase64 } from "../utils/uploadImage";
const CreateCourseAdmin = ({ getCourse }) => {
  const { control, handleSubmit, reset } = useForm();
  const [fileImage, setFileImage] = useState();
  const [fileName, setFileName] = useState();

  const uploadImage = async (e) => {
    try {
      const file = e.target.files[0];
      setFileName(e.target.files[0].name);
      const base64 = await convertBase64(file);
      setFileImage(base64);
    } catch (error) {
      console.log("🚀 ~ uploadImage ~ error:", error);
    }
  };
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${endpoint}/create-course`, {
        ...data,
        image: fileImage,
      });
      console.log("🚀 ~ onSubmit ~ res:", res);
      getCourse();
      toast.success("Tạo lớp học mới thành công");
      reset({
        image: "",
        name: "",
        availableSeats: "",
        price: "",
        desc: "",
        totalStudents: "",
        schedule: "",
      });
    } catch (error) {
      toast.warning(error?.response?.data?.message);
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <>
      <h1 className="text-white text-center font-bold text-2xl mb-4">
        Thêm lớp học
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 text-white">
          <Input
            name="image"
            control={control}
            className="!pl-[25px] relative bg-darkColors1 border-none"
            placeholder={fileName ? fileName : "Ảnh"}
          ></Input>

          <label
            htmlFor="myfile"
            className="absolute right-10 translate-y-3/4 -translate-x-1/2  cursor-pointer"
          >
            <PhotoIcon></PhotoIcon>
          </label>
          <input
            type="file"
            id="myfile"
            name="myfile"
            onChange={uploadImage}
            className="hidden"
          ></input>

          <Input
            name="name"
            control={control}
            className="!pl-[25px] bg-darkColors1 border-none"
            placeholder="Tên"
          ></Input>

          <Input
            name="schedule"
            control={control}
            className="!pl-[25px] bg-darkColors1 border-none"
            placeholder="Khung giờ"
          ></Input>

          <Input
            name="availableSeats"
            control={control}
            className="!pl-[25px] bg-darkColors1 border-none"
            placeholder="Chỗ còn trống"
          ></Input>

          <Input
            name="price"
            control={control}
            className="!pl-[25px] bg-darkColors1 border-none"
            placeholder="Giá"
          ></Input>

          <Input
            name="totalStudents"
            control={control}
            className=" !pl-[25px] bg-darkColors1 border-none"
            placeholder="Số lượng học viên"
          ></Input>

          <Input
            name="desc"
            control={control}
            className="!pl-[25px] bg-darkColors1 border-none"
            placeholder="Mô tả"
          ></Input>

          <Button
            type="submit"
            className=" w-full  text-bodyBold rounded-[6px] py-[9px] text-white"
            name="create-course"
          >
            Thêm
          </Button>
        </div>
      </form>
    </>
  );
};
CreateCourseAdmin.propTypes = {
  getCourse: PropTypes.func,
};
export default CreateCourseAdmin;
