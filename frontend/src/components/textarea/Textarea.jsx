import { useController } from "react-hook-form";
import PropTypes from "prop-types";
const Textarea = ({ control, name, placeholder, id, className }) => {
  const { field } = useController({
    control,
    name,
  });
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      id={id}
      className={className}
      {...field}
    ></textarea>
  );
};

Textarea.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  className: PropTypes.string,
  control: PropTypes.any.isRequired,
};
export default Textarea;
