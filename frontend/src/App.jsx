import { Route, Routes } from "react-router-dom";
import LoginPage from "./page/Auth/LoginPage";
import RegisterPage from "./page/Auth/RegisterPage";
import HomePage from "./page/Home/HomePage";
import LoginSignUpLayout from "./layout/LoginSignUpLayout";
import LayoutCommon from "./layout/LayoutCommon";
import InstructorsPage from "./page/Instructors/InstructorsPage";
import CoursesPage from "./page/Courses/CoursesPage";
import CourseDetailPage from "./page/Courses/CourseDetailPage";
import BlogPage from "./page/Blog/BlogPage";
import BlogDetailPage from "./page/Blog/BlogDetailPage";
import LayoutAdmin from "./layout/LayoutAdmin";
import CourseAdminPage from "./page/Admin/page/CourseAdminPage";
import InstructorAdminPage from "./page/Admin/page/InstructorAdminPage";
import UpdateInstructorAdmin from "./page/Admin/UpdateInstructorAdmin";
import Modal from "react-modal";
import UpdateCourseAdminPage from "./page/Admin/UpdateCourseAdminPage";
Modal.setAppElement("#root");
function App() {
  return (
    <Routes>
      <Route element={<LoginSignUpLayout></LoginSignUpLayout>}>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      </Route>

      <Route element={<LayoutCommon></LayoutCommon>}>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route
          path="/instructors"
          element={<InstructorsPage></InstructorsPage>}
        ></Route>
        <Route path="/courses" element={<CoursesPage></CoursesPage>}></Route>
        <Route
          path="/course-detail/:id"
          element={<CourseDetailPage></CourseDetailPage>}
        ></Route>
        <Route path="/blogs" element={<BlogPage></BlogPage>}></Route>
        <Route
          path="/blog-detail/:id"
          element={<BlogDetailPage></BlogDetailPage>}
        ></Route>
      </Route>

      <Route element={<LayoutAdmin></LayoutAdmin>}>
        <Route path="/admin/dashboard"></Route>
        <Route
          path="/admin/courses"
          element={<CourseAdminPage></CourseAdminPage>}
        ></Route>
        <Route
          path="/admin/instructors"
          element={<InstructorAdminPage></InstructorAdminPage>}
        ></Route>

        <Route
          path="admin/courses/update-course/:id"
          element={<UpdateCourseAdminPage></UpdateCourseAdminPage>}
        ></Route>

        <Route
          path="admin/instructors/update-instructor/:id"
          element={<UpdateInstructorAdmin></UpdateInstructorAdmin>}
        ></Route>
      </Route>
    </Routes>
  );
}

export default App;
