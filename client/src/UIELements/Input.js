import React, { Fragment } from "react";

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
    classes,
    showInput,
    name,
    classesForPrependSign,
    updateSearchByInput,

    children,
  } = props;

  return (
    <div
      className="input__container"
      style={stylesForInputContainer && stylesForInputContainer}
    >
      {label && <label>{label}</label>}
      {prependSign ? (
        <span style={stylesForPrependSign && stylesForPrependSign} classes={classes && classes}>

         

          {updateSearchByInput ? <span className={`input__container-prepend ${classesForPrependSign && classesForPrependSign}`} onClick={() => updateSearchByInput("")}>{prependSign}</span> : <span className={`input__container-prepend ${classesForPrependSign && classesForPrependSign}`}>{prependSign}</span> }

          <input
            type={type || "text"}
            placeholder={placeholder}
            value={val}
            disabled={disabled || false}
            name={name}
            onChange={(e) => props.handleChange(e)}
            onKeyDown={(e) => props.onKeyDown(e)}
          />
        </span>
      ) : (
        showInput && (
          <input
            type={type || "text"}
            placeholder={placeholder && placeholder}
            value={val}
            className={classes && classes}
            disabled={disabled || false}
            name={name}
            onChange={(e) => props.handleChange(e)}
            onKeyDown={(e) => props.onKeyDown(e)}
          />
        )
      )}
    </div>
  );
};

export default Input;
