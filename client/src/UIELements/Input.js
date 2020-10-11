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
    stylesForInputContainer,
    classes
  } = props;
  return (
    <div className="input__container" style={stylesForInputContainer && stylesForInputContainer}>
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
          placeholder={placeholder && placeholder}
          value={val}
          className={classes && classes}
          disabled={disabled || false}
        />
      )}
    </div>
  );
};

export default Input;
