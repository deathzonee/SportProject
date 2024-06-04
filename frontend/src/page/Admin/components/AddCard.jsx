import PlusIcon from "../../../components/icons/PlusIcon";
import PropTypes from "prop-types";
const AddCard = ({ onClick }) => {
  return (
    <button
      className="bg-gray-500 p-3 text-white rounded-full inline-block fixed z-10 bottom-3 right-3 "
      onClick={onClick}
    >
      <PlusIcon></PlusIcon>
    </button>
  );
};
AddCard.propTypes = {
  onClick: PropTypes.func,
};
export default AddCard;
