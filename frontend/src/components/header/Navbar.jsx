import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { createAxios } from "../../utils/createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import { logout } from "../../redux/apiRequest";
import useClickOutSide from "../../hooks/useClickOutSide";
import { CartIcon, CloseIcon, MenuIcon } from "../icons";
import styled from "styled-components";
import Cart from "../Cart";
const navLinks = [
  {
    id: 1,
    name: "Trang chủ",
    url: "/",
  },

  {
    id: 2,
    name: "HLV",
    url: "/instructors",
  },

  { id: 3, name: "CLB", url: "/courses" },
  { id: 4, name: "Bài viết", url: "/blogs" },
];
const HeaderSyled = styled.header`
  position: fixed;
  top: 0;
  background-color: white;
  width: 100%;
  padding: 24px 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  #check {
    display: none;
  }
  .icons {
    position: absolute;
    right: 5%;
    cursor: pointer;
    display: none;
  }

  @media (max-width: 46.1875em) {
    .icons {
      display: inline-flex;
    }

    .navbar {
      position: absolute;
      background-color: white;
      top: 100%;
      left: 0;
      width: 100%;
      height: 0;
      display: flex;
      flex-direction: column;
      transition: 0.3s ease;
      overflow: hidden;
    }
    #check:checked ~ .navbar {
      height: 280px;
    }
    #close-icon {
      display: none;
    }

    #check:checked ~ .icons #menu-icon {
      display: none;
    }

    #check:checked ~ .icons #close-icon {
      display: block;
    }

    .navbar li {
      transform: translateY(-50px);
      transition: all.3s ease;
    }

    #check:checked ~ .navbar li {
      transform: translateY(0);
    }
  }
`;
const Navbar = () => {
  const user = useSelector((state) => state?.auth?.login?.currentUser);
  const accessToken = user?.accessToken;
  const id = user?.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const handleLogout = () => {
    logout(dispatch, id, navigate, accessToken, axiosJWT);
  };
  const { show, setShow, nodeRef } = useClickOutSide();
  const {
    show: showCart,
    setShow: setShowCart,
    nodeRef: nodeRefCart,
  } = useClickOutSide();
  const handleShow = () => {
    setShow(!show);
  };
  const handleShowCart = () => {
    setShowCart(!showCart);
  };
  return (
    <HeaderSyled>
      <a href="/" className="text-heading2Bold font-bold">
        SportsClub
      </a>

      <input type="checkbox" id="check" />
      <label htmlFor="check" className="icons">
        <div id="menu-icon">
          <MenuIcon></MenuIcon>
        </div>
        <div id="close-icon">
          <CloseIcon></CloseIcon>
        </div>
      </label>

      <ul className="navbar flex items-center gap-[30px] text-black">
        {navLinks.length &&
          navLinks.map((navLink) => (
            <li key={navLink.id}>
              <NavLink
                to={navLink.url}
                className={({ isActive }) =>
                  `font-bold ${isActive ? "text-secondary" : ""}`
                }
              >
                <span className="hover:text-secondary">{navLink.name}</span>
              </NavLink>
            </li>
          ))}
        <div className="relative" ref={nodeRefCart}>
          <button onClick={handleShowCart}>
            <CartIcon></CartIcon>
          </button>

          {showCart && (
            <Cart className="absolute w-[300px] top-10 right-1/3 translate-x-1/3 bg-white shadow-lg p-5 rounded-lg"></Cart>
          )}
        </div>
        <div className="relative inline-block" ref={nodeRef}>
          <button
            onClick={handleShow}
            className="max-w-32 capitalize bg-secondary text-white px-4 py-2 rounded-md transition duration-200 ease-in-out transform hover:scale-105"
          >
            {user?.data?.username}
          </button>
          {show && (
            <Link
              to="/login"
              className="w-full absolute top-11 left-0 shadow-lg bg-white px-4 py-2 text-center transition duration-200 ease-in-out transform hover:scale-105"
              onClick={handleLogout}
            >
              Đăng xuất
            </Link>
          )}
        </div>
      </ul>
    </HeaderSyled>
  );
};

export default Navbar;
