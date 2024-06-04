import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import ButtonCard from "./ButtonCard";

const Card = ({
  image,
  name,
  availableSeats,
  totalEnrolled,
  schedule,
  price,
  item,
  _id,
}) => {
  const { addItem } = useCart();
  return (
    <div
      key={_id}
      className={`md:w-[320px] w-full py-4 hover:-translate-y-2 duration-150 
       shadow-lg cursor-pointer rounded-xl overflow-hidden`}
    >
      <img
        src={image}
        alt=""
        className="object-cover w-full h-[200px] rounded-md"
      ></img>

      <div className="px-6 py-2">
        <h2 className="capitalize text-center text-heading3Bold font-semibold mb-2">
          {name}
        </h2>
        <p className="text-gray-600 mb-2">Chỗ còn trống: {availableSeats}</p>
        <p className="text-gray-600 mb-2">
          Giá: <span className="text-green-500 font-semibold">{price}Đ</span>
        </p>
        <p className="text-gray-600 mb-2">
          Số lượng học viên: {totalEnrolled} học viên
        </p>
        <p className="text-gray-600 mb-2">Khung giờ: {schedule}h</p>

        <ButtonCard onClick={() => addItem(item)}>Đăng kí</ButtonCard>
        <Link to={`/course-detail/${_id}`}>
          <ButtonCard>Xem chi tiết</ButtonCard>
        </Link>
      </div>
    </div>
  );
};

Card.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  availableSeats: PropTypes.number,
  price: PropTypes.number,
  totalEnrolled: PropTypes.number,
  item: PropTypes.any,
  schedule: PropTypes.string,
  _id: PropTypes.string,
  index: PropTypes.number,
};
export default Card;
