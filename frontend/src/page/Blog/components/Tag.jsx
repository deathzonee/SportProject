import { useController } from "react-hook-form";
import PropTypes from "prop-types";
const Tag = ({ name, placeholder, id, className, control }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <input
      name={name}
      placeholder={placeholder}
      id={id}
      className={`w-1/2 md:w-full  bg-white !px-3 !py-3  ${className}`}
      {...field}
    ></input>
  );
};

Tag.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  control: PropTypes.any.isRequired,
};
export default Tag;
