import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PencilIcon from "../../../components/icons/PencilIcon";
import TrashIcon from "../../../components/icons/TrashIcon";
import styled from "styled-components";
const CardCourseAdminStyled = styled.div`
  position: relative;
  border-radius: 12px;
  padding-bottom: 16px;
  background-color: #191c21;
  cursor: pointer;
  overflow: hidden;
  .hover-group:hover .pencil-icon,
  .hover-group:hover .trash-icon {
    opacity: 1;
  }
`;
const CardCourseAdmin = ({
  image,
  name,
  availableSeats,
  price,
  totalStudent,
  _id,
  deleteCourse,
}) => {
  return (
    <CardCourseAdminStyled key={_id} className="shadow-md">
      <div className="relative hover-group">
        <img
          src={image}
          alt=""
          className="image object-cover w-full h-[200px]"
        ></img>

        <Link
          to={`/admin/courses/update-course/${_id}`}
          className="pencil-icon absolute top-0 left-0 translate-x-1/2 translate-y-3/4 bg-slate-600 rounded-full p-2 text-white opacity-0 hover:bg-red-500"
        >
          <PencilIcon></PencilIcon>
        </Link>
        <button
          onClick={() => {
            deleteCourse(_id);
          }}
          className="trash-icon absolute right-0 top-0 -translate-x-1/2 translate-y-3/4 bg-slate-600 rounded-full p-2 text-white opacity-0 hover:bg-red-500"
        >
          <TrashIcon></TrashIcon>
        </button>
      </div>

      <div className="px-6 py-2 flex flex-col text-white">
        <h3 className="text-heading3Bold font-semibold text-center mb-1 capitalize">
          {name}
        </h3>
        <span>Số lượng học viên: {totalStudent} học viên</span>

        <span>Chỗ còn trống: {availableSeats}</span>
        <div className="text-white">
          Giá: <span className="text-green-500 font-semibold">{price} Đ</span>
        </div>
      </div>
    </CardCourseAdminStyled>
  );
};

CardCourseAdmin.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  availableSeats: PropTypes.number,
  price: PropTypes.number,
  _id: PropTypes.string,
  totalStudent: PropTypes.number,
  index: PropTypes.number,
  deleteCourse: PropTypes.func,
};
export default CardCourseAdmin;
