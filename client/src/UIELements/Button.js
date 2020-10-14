import React, { Fragment } from "react";

import "./Button.css";

const Button = (props) => {
  const { type, text, classes, disabled, onClick } = props;
  return (
    <Fragment>
      {onClick ? (
        <button type={type || "text"} className={classes} 
        onClick={onClick}>
          {text}
        </button>
      ) : (
        <button type={type || "text"} className={classes} disabled={disabled && disabled}>
          {text}
        </button>
      )}
    </Fragment>
  );
};

export default Button;