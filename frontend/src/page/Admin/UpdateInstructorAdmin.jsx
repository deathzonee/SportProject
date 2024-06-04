import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { endpoint } from "../../utils/endpoint";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { PhotoIcon } from "../../components/icons";
import { convertBase64 } from "../../utils/uploadImage";

const UpdateInstructorAdmin = () => {
  const { control, handleSubmit } = useForm();
  const [instructors, setInstructors] = useState();
  const param = useParams();
  let { id } = param;
  const navigate = useNavigate();
  useEffect(() => {
    const getInstructor = async (id) => {
      try {
        const response = await axios.get(`${endpoint}/get-instructor/${id}`);
        setInstructors(response?.data?.message);
        console.log("🚀 ~ getInstructor ~ response:", response);
      } catch (error) {
        console.log("🚀 ~ getInstructor ~ error:", error);
      }
    };
    getInstructor(id);
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
  const updateInstructor = async (data, id) => {
    try {
      await axios.put(`${endpoint}/update-instructor/${id}`, {
        ...data,
        image: fileImage,
      });
      navigate("/admin/instructors");
      toast.success(`Cập nhật thành công`);
    } catch (error) {
      console.log("🚀 ~ updateInstructor ~ error:", error);
      toast.warning(error.response.data.message);
    }
  };
  return (
    <div className="bg-darkColors2 px-[100px] py-10 h-screen">
      <h1 className="text-white text-center font-bold text-2xl mb-4">
        Cập nhật huấn luyện viên
      </h1>
      {instructors && (
        <form
          onSubmit={handleSubmit((data) =>
            updateInstructor(data, instructors._id)
          )}
        >
          <div className="flex flex-col gap-5 text-white">
            <Input
              name="image"
              control={control}
              className="!pl-[25px] pr-20"
              placeholder={fileName ? fileName : instructors.image}
              type="text"
              iconCSS="right-0 top-1/2 -translate-y-1/2 -translate-x-1/2"
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
              className="!pl-[25px] pr-20"
              placeholder="Name"
              defaultValue={instructors.name}
            ></Input>

            <Input
              name="courses"
              control={control}
              className="!pl-[25px] pr-20"
              placeholder="Course"
              defaultValue={
                instructors.courses?.length > 0 &&
                instructors.courses?.map((course) => course.name)
              }
            ></Input>

            <Button
              type="submit"
              className=" w-full  text-bodyBold rounded-[6px] py-[9px] text-white"
              name="update-instructor"
            >
              Cập nhật
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateInstructorAdmin;
