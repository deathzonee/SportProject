import PropTypes from "prop-types";
import classNames from "../../utils/classNames";
import SpinnerLoading from "../../loader/SpinnerLoading";
import WaveLoading from "../../loader/WaveLoading";

const Button = ({
  className = "",
  children,
  type = "button",
  name = "",
  onClick = () => {},
  isSubmitting = false,
  spinner = false,
}) => {
  const child = isSubmitting ? (
    spinner ? (
      <SpinnerLoading />
    ) : (
      <WaveLoading />
    )
  ) : (
    children
  );
  return (
    <button
      className={classNames(
        "md:text-displayBold font-medium md:py-[14px] md:rounded-[10px] text-center",
        `${className}`,
        `${
          isSubmitting
            ? "bg-[#4b76e283] cursor-not-allowed"
            : "bg-[#2d64f0] cursor-pointer"
        }`
      )}
      type={type}
      name={name}
      id={name}
      onClick={onClick}
      disabled={isSubmitting ? true : false}
    >
      {child}
    </button>
  );
};

export default Button;

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  name: PropTypes.string,
  isSubmitting: PropTypes.any,
  onClick: PropTypes.func,
  spinner: PropTypes.bool,
};
