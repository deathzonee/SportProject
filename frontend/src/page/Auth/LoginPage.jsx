import Input from "../../components/input/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../../components/button/Button";
import HeaderAuth from "../Home/header/HeaderAuth";
import Ques from "./components/Ques";
import { MailIcon, PasswordIcon } from "../../components/icons";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WaveLoading from "../../loader/WaveLoading";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/apiRequest";
const schema = yup.object().shape({
  email: yup
    .string("Địa chỉ email không hợp lệ")
    .email()
    .required("Trường này bắt buộc"),
  password: yup
    .string()
    .required("Trường này bắt buộc")
    .min(8, "Mật khẩu phải có 8 ký tự trở lên"),
});
const LoginPage = () => {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const fetching = useSelector((state) => state?.auth?.login?.isFetching);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (data) => {
    loginUser(data, dispatch, navigate, toast);
  };

  useEffect(() => {
    document.title = "Log In";
    return () => {
      document.title = "Vite + React";
    };
  });
  return (
    <div className="h-screen flex items-center justify-center pt-6 px-6">
      <div className="w-[580px] bg-darkColors2  p-[40px] rounded-[20px] py-6">
        <HeaderAuth title="Đăng nhập"></HeaderAuth>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <Input
              name="email"
              placeholder="Email"
              id="email"
              control={control}
              type="email"
              error={errors?.email?.message}
              className="rounded-[10px] py-[9px] "
              iconCSS="left-0 top-2/4 translate-x-5 -translate-y-2/4"
            >
              <MailIcon></MailIcon>
            </Input>

            <Input
              name="password"
              placeholder="Mật khẩu"
              id="password"
              control={control}
              type="password"
              error={errors?.password?.message}
              className="rounded-[10px] py-[9px]"
              iconCSS="left-0 top-2/4 translate-x-5 -translate-y-2/4"
              eyes={true}
            >
              <PasswordIcon></PasswordIcon>
            </Input>

            <Ques
              ques="Bạn chưa có tài khoản ?"
              textLink="Đăng kí"
              to="/register"
            ></Ques>
            <Button
              type="submit"
              className=" w-full mb-[30px] text-bodyBold rounded-[6px] py-[9px]"
              name="signin"
              isSubmitting={fetching ? <WaveLoading></WaveLoading> : ""}
            >
              Đăng nhập
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
