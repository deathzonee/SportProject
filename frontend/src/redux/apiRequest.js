import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { endpoint } from "../utils/endpoint";
import { getUsersFailed, getUsersStart } from "./userSlice";
import { setSearch } from "./searchSlice";

export const loginUser = async (dataForm, dispatch, navigate, toast) => {
  dispatch(loginStart());
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await axios.post(`${endpoint}/login`, dataForm, config);

    console.log("🚀 ~ loginUser ~ response:", response);
    dispatch(loginSuccess(response.data));
    if (response?.data?.data?.admin) {
      navigate("/admin/dashboard");
      toast.success("Successfully logged in as admin");
    } else {
      navigate("/");
      toast.success("Đăng nhập thành công");
    }
  } catch (error) {
    dispatch(loginFailed());
    toast.error("Email hoặc mật khẩu không đúng");
    console.log("🚀 ~ loginUser ~ error:", error);
  }
};

export const registerUser = async (dataForm, dispatch, navigate, toast) => {
  dispatch(registerStart());
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    await axios.post(`${endpoint}/register`, dataForm, config);
    dispatch(registerSuccess());
    toast.success("Đăng kí thành công");
    navigate("/login");
  } catch (error) {
    dispatch(registerFailed());
    toast.warning("Đăng kí thất bại");
  }
};

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const response = await axios.get(`${endpoint}/get-users`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersStart(response.data));
  } catch (error) {
    dispatch(getUsersFailed());
  }
};

export const logout = async (dispatch, id, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post(`${endpoint}/logout`, id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(logoutSuccess());
    navigate("/login");
  } catch (error) {
    dispatch(logoutFailed());
  }
};

export const searchCourse = async (dispatch, key, setLoading) => {
  try {
    setLoading(true);
    if (key !== "") {
      const response = await axios.get(`${endpoint}/search-course/?key=${key}`);
      dispatch(setSearch(response.data));
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.log("🚀 ~ searchCourse ~ error:", error);
  }
};
