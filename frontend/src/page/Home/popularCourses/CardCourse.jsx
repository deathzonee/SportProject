import PropTypes from "prop-types";

const CardCourse = ({
  image,
  availableSeats,
  name,
  price,
  totalEnrolled,
  schedule,
}) => {
  return (
    <div className="shadow-lg rounded-lg p-3 flex flex-col justify-between border border-secondary overflow-hidden m-4">
      <img
        src={image}
        alt=""
        className="object-cover flex-shrink-0 h-[178px]"
      ></img>
      <div className="p-4">
        <h2 className="text-center capitalize text-heading3Bold font-semibold mb-2">
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
      </div>
    </div>
  );
};

CardCourse.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  availableSeats: PropTypes.number,
  price: PropTypes.number,
  totalEnrolled: PropTypes.number,
  schedule: PropTypes.string,
};
export default CardCourse;
