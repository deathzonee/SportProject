import { Outlet } from "react-router-dom";
import Navbar from "../components/header/Navbar";

const LayoutCommon = () => {
  return (
    <main className="h-screen">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </main>
  );
};

export default LayoutCommon;
