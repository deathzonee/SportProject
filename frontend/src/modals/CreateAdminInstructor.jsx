import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import PropTypes from "prop-types";
import { endpoint } from "../utils/endpoint";
import { PhotoIcon } from "../components/icons";
import { useState } from "react";
import { convertBase64 } from "../utils/uploadImage";
const CreateAdminInstructor = ({ getInstructor }) => {
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
      await axios.post(`${endpoint}/create-instructor`, {
        ...data,
        image: fileImage,
      });
      getInstructor();
      toast.success("Create Success");
      reset({
        image: "",
        name: "",
        availableSeats: "",
        price: "",
        desc: "",
      });
    } catch (error) {
      toast.warning(error.response.data.message);
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
  };
  return (
    <>
      <h1 className="text-white text-center font-bold text-2xl mb-4">
        Thêm huấn luyện viên
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5 text-white">
          <Input
            name="image"
            control={control}
            className="!pl-[25px] bg-darkColors1 border-none"
            placeholder={fileName ? fileName : "Image"}
          ></Input>
          <label
            htmlFor="myfile"
            className="text-white absolute right-10 translate-y-3/4 -translate-x-1/2  cursor-pointer"
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
            placeholder="Name"
          ></Input>

          <Input
            name="courses"
            control={control}
            className="!pl-[25px] bg-darkColors1 border-none"
            placeholder="Course"
          ></Input>

          <Button
            type="submit"
            className=" w-full  text-bodyBold rounded-[6px] py-[9px] text-white"
            name="create-instructor"
          >
            Thêm
          </Button>
        </div>
      </form>
    </>
  );
};
CreateAdminInstructor.propTypes = {
  getInstructor: PropTypes.func,
};
export default CreateAdminInstructor;
