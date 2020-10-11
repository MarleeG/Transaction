import React from "react";

import "./Button.css";

const Button = (props) => {
  const { type, text, classes } = props;
  return (
    <button type={type || "text"} className={classes}>
      {text}
    </button>
  );
};

export default Button;
