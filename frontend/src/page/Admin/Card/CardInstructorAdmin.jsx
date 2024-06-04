import { Link } from "react-router-dom";
import ButtonCard from "../../Courses/components/ButtonCard";
import PropTypes from "prop-types";
const CardInstructorAdmin = ({ image, name, _id, deleteInstructor }) => {
  return (
    <div className="w-[90%] mx-auto pt-10">
      <div className="flex flex-col items-center gap-4 ">
        <div key={_id} className="w-full flex items-center gap-6 ">
          <img src={image} className="w-20 h-20 object-cover rounded-md"></img>
          <span className="w-[100px] inline-block line-clamp-1 capitalize">
            {name}
          </span>
          <Link to={`/admin/instructors/update-instructor/${_id}`}>
            <ButtonCard className="w-[100px]">Cập nhật</ButtonCard>
          </Link>
          <ButtonCard
            className="!w-[100px]"
            onClick={() => deleteInstructor(_id)}
          >
            Xoá
          </ButtonCard>
        </div>
      </div>
    </div>
  );
};

CardInstructorAdmin.propTypes = {
  deleteInstructor: PropTypes.func,
  image: PropTypes.string,
  name: PropTypes.string,
  totalStudent: PropTypes.number,
  _id: PropTypes.string,
};

export default CardInstructorAdmin;
