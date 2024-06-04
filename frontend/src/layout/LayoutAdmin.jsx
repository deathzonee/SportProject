import { Outlet } from "react-router-dom";
import HeaderAdmin from "./components/HeaderAdmin";
import SideBar from "./components/Sidebar";

const LayoutAdmin = () => {
  return (
    <div className="flex">
      <span className="md:min-w-[240px] ">
        <SideBar></SideBar>
      </span>
      <main className="w-full rounded-md md:pt-[78px] md:pb-0 pt-[62px] pb-[56px]">
        <HeaderAdmin></HeaderAdmin>
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default LayoutAdmin;
