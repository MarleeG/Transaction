import React from "react";

import "./Input.css";
const Input = (props) => {
  const {
    label,
    type,
    placeholder,
    disabled,
    val,
    prependSign,
    stylesForPrependSign,
  } = props;
  return (
    <div className="input__container">
      {label && <label>{label}</label>}

      {prependSign ? (
        <span style={stylesForPrependSign && stylesForPrependSign}>
          <span className="unit-input__prepend">{prependSign}</span>

          <input
            type={type || "text"}
            placeholder={placeholder}
            value={val}
            disabled={disabled || false}
          />
        </span>
      ) : (
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={val}
          disabled={disabled || false}
        />
      )}
    </div>
  );
};

export default Input;
