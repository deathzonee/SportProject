import { useController } from "react-hook-form";
import PropTypes from "prop-types";
import React, { useState } from "react";
import OpenEyeIcon from "../icons/OpenEyeIcon";
import CloseEyeIcon from "../icons/CloseEyeIcon";

const Input = React.memo(
  ({
    error,
    name,
    placeholder,
    type = "text",
    className = "",
    eyes = false,
    children,
    iconCSS,
    control,
    defaultValue,
    classNameWrap = "",
    value,
    onchange = () => {},
    ...props
  }) => {
    const { field } = useController({
      control,
      name: name,
      defaultValue: defaultValue || "",
    });

    const [checked, setChecked] = useState(false);
    const handleChangeIcon = () => {
      setChecked(!checked);
    };

    return (
      <div className="wrap-input">
        <div className={`relative ${classNameWrap}`}>
          <input
            className={`w-full pl-[46px] pr-5 md:py-[15px] border border-grayColor md:rounded-[10px] outline-none text-bodyBold font-medium bg-darkColors2 ${className}`}
            name={name}
            placeholder={placeholder}
            type={checked ? "text" : type}
            onChange={onchange}
            value={value}
            autoComplete="off"
            {...props}
            {...field}
          />

          {children && (
            <span className={`absolute  ${iconCSS}`}>{children}</span>
          )}
          {eyes && (
            <span className="absolute right-9 top-2/4 translate-x-5 -translate-y-2/4 cursor-pointer select-none">
              {checked ? (
                <OpenEyeIcon onClick={handleChangeIcon}></OpenEyeIcon>
              ) : (
                <CloseEyeIcon onClick={handleChangeIcon}></CloseEyeIcon>
              )}
            </span>
          )}
        </div>

        {error?.length > 0 && (
          <span className="mt-[10px] text-sm text-red-500  block capitalize">
            {error}
          </span>
        )}
      </div>
    );
  }
);

export default Input;

Input.displayName = "Input";
Input.propTypes = {
  error: PropTypes.string,
  control: PropTypes.any.isRequired,
  placeholder: PropTypes.any,
  type: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  iconCSS: PropTypes.string,
  eyes: PropTypes.bool,
  value: PropTypes.any,
  classNameWrap: PropTypes.string,
  onchange: PropTypes.func,
  defaultValue: PropTypes.any,
};
