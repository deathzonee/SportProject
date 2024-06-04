import PropTypes from "prop-types";
const CardInstructor = ({ name, img }) => {
  return (
    <div className="flex hover:-translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-10 rounded-md">
      <div className="flex flex-col gap-6 ">
        <img
          src={img}
          className="rounded-full border-4 border-gray-300 h-24 w-24 mx-auto object-cover "
        ></img>

        <div className="flex flex-col text-center">
          <p className="font-medium text-lg text-gray-800 capitalize">{name}</p>
          <p className="text-gray-500 whitespace-normal">HLV</p>
        </div>
      </div>
    </div>
  );
};

CardInstructor.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string,
};
export default CardInstructor;
