import PropTypes from "prop-types";
const ButtonCard = ({ children, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 mt-4 w-full text-white disabled:bg-red-300 bg-secondary  rounded-lg hover:bg-red-700 text-center ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

ButtonCard.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ButtonCard;
