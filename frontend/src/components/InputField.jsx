/* eslint-disable react/require-default-props */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import { useState } from "react";
import { ErrorMessage, useField } from "formik";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import PasswordStrengthBar from "react-password-strength-bar";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import RadioInput from "../RadioInput";

function InputField({
  type,
  label,
  styling,
  inputStyle,
  options,
  tag,
  height,
  border = true,
  ...props
}) {
  const [field, meta] = useField(props);
  const [passwordType, setPasswordType] = useState(type);

  const location = useLocation();
  const { pathname } = location;
  // Show and Hide Password Function
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };
  return (
    <div className={`${styling} w-full`}>
      <label
        htmlFor={field.name}
        className="mb-[4px] text-[14px] text-brand2 font-[600]"
      >
        {label}
      </label>

      <div
        className={`flex items-center appearance-none form-input ${
          border &&
          "border-[#E2E8F0] bg-white focus-within:border-brand2 focus-within:ring-brand2 focus-within:ring-1"
        } w-full text-[14px] ${
          meta.touched &&
          meta.error &&
          border &&
          "border-red-700 ring-red-100 ring-1"
        } ${height}`}
      >
        {/* checks if it's an input, textarea or selct tag */}
        {tag === "input" ? (
          <>
            <input
              {...field}
              name={field.name}
              id={field.name}
              placeholder={props.placeholder}
              autoComplete="off"
              type={type === "password" ? passwordType : type}
              className="w-full h-full border-none focus:border-none focus-within:outline-none focus:ring-0 pl-1 focus:border-0 text-[14px]"
            />

            {type === "password" && (
              <span
                onClick={togglePassword}
                className="mr-3 cursor-pointer"
                aria-hidden="true"
              >
                {passwordType === "password" ? (
                  <AiOutlineEyeInvisible className="w-[16px] md:w-[24px]" />
                ) : (
                  <AiOutlineEye className="w-[16px] md:w-[24px]" />
                )}
              </span>
            )}
          </>
        ) : tag === "select" ? (
          <select
            name={props.name}
            className={`w-full h-full focus:outline-none bg-transparent py-[8px] placeholder:text-black5 text-black5 text-mukta font-[400] ${inputStyle}`}
            {...field}
          >
            {options.map((option) => (
              <option
                value={option.name}
                key={option.id}
                className="w-full"
                disabled={option.isDisabled}
              >
                {option.name}
              </option>
            ))}
          </select>
        ) : tag === "textarea" ? (
          <textarea
            name={props.name}
            id=""
            cols={100}
            rows="4"
            className={`w-full h-full focus:outline-none bg-transparent py-[8px] placeholder:text-black5 text-black5 text-mukta font-[400] resize-none ${inputStyle}`}
            placeholder={props.placeholder}
            {...field}
          />
        ) : tag === "radio" ? (
          <RadioInput field={field} options={options} />
        ) : (
          ""
        )}
      </div>

      {type === "password" && pathname === "/" && (
        <PasswordStrengthBar password={field.value} />
      )}
      <ErrorMessage
        className="text-red-700 text-xs mt-0"
        component="div"
        name={field.name}
      />
    </div>
  );
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  styling: PropTypes.string,
  inputStyle: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ),
  tag: PropTypes.string.isRequired,
  height: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  border: PropTypes.bool,
};

export default InputField;
