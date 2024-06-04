import { useEffect } from "react";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import WaveLoading from "../../loader/WaveLoading";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import HeaderAuth from "../Home/header/HeaderAuth";
import { toast } from "react-toastify";
import Ques from "./components/Ques";
import { useNavigate } from "react-router-dom";
import {
  DateIcon,
  MailIcon,
  NameIcon,
  PasswordIcon,
} from "../../components/icons";
import { registerUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const schema = yup.object().shape({
  email: yup
    .string("Địa chỉ email không hợp lệ")
    .email()
    .required("Trường này là bắt buộc"),
  username: yup.string().required("Vui lòng nhập tên của bạn"),
  password: yup
    .string()
    .required("Trường này là bắt buộc")
    .min(8, "Mật khẩu phải có 8 kí tự trở lên"),
  dateofbirth: yup.string().required("Trường này là bắt buộc"),
});

const RegisterPage = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const fetching = useSelector((state) => state?.auth?.register?.isFetching);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Register";
    return () => {
      document.title = "Vite + React";
    };
  });

  const onSubmitHandler = async (data) => {
    registerUser(data, dispatch, navigate, toast);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center px-6 py-6">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="bg-darkColors2 md:p-10 rounded-[20px] pt-6 px-5  pb-6"
      >
        <HeaderAuth
          title="Bắt đầu"
          desc="Tạo một tài khoản để tiếp tục và kết nối với mọi người."
        ></HeaderAuth>
        <div className="flex flex-col gap-5 ">
          <Input
            name="email"
            placeholder="Email"
            id="email"
            control={control}
            type="email"
            error={errors?.email?.message}
            iconCSS="left-0 top-2/4 translate-x-5 -translate-y-2/4"
            className="rounded-[6px] py-[9px]"
          >
            <MailIcon></MailIcon>
          </Input>
          <Input
            name="username"
            placeholder="Tên của bạn"
            id="username"
            control={control}
            type="text"
            error={errors?.username?.message}
            iconCSS="left-0 top-2/4 translate-x-5 -translate-y-2/4"
            className="rounded-[6px] py-[9px]"
          >
            <NameIcon></NameIcon>{" "}
          </Input>

          <Input
            name="password"
            placeholder="Mật khẩu"
            id="password"
            type="password"
            error={errors?.password?.message}
            control={control}
            iconCSS="left-0 top-2/4 translate-x-5 -translate-y-2/4"
            className="rounded-[6px] py-[9px]"
            eyes={true}
          >
            <PasswordIcon></PasswordIcon>
          </Input>

          <Input
            name="dateofbirth"
            placeholder="Ngày sinh"
            id="date"
            type="text"
            error={errors?.dateofbirth?.message}
            control={control}
            iconCSS="left-0 top-2/4 translate-x-5 -translate-y-2/4"
            className="rounded-[6px] py-[9px]"
          >
            <DateIcon></DateIcon>
          </Input>

          <Button
            type="submit"
            className="w-full mb-[20px] text-bodyBold rounded-[6px] py-[9px]"
            name="signup"
            isSubmitting={fetching ? <WaveLoading></WaveLoading> : ""}
          >
            Đăng kí
          </Button>
          <Ques to="/login" ques="Bạn đã có tài khoản ?" textLink="Đăng nhập" />
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
