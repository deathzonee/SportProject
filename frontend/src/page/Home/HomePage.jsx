import { useSelector } from "react-redux";
import BannerContainer from "./banner/BannerContainer";
import Gallary from "./gallery/Gallery";
import PopularCourses from "./popularCourses/PopularCourses";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopularInstructor from "./popularTeacher/PopularInstructor";
const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, []);
  return (
    <section className="pb-6">
      <BannerContainer></BannerContainer>
      <Gallary></Gallary>
      <PopularCourses></PopularCourses>
      <PopularInstructor></PopularInstructor>
    </section>
  );
};

export default HomePage;
