import React from "react";

import "./Widget.css";

const Widget = (props) => {
  const { width, height, header, classes, children } = props;

  const styles = {
    width: width,
    // height: height
  };

  return (
    <div className={`widget__container ${classes}`}>
      <div className="widget__header-wrapper" style={styles}>
        <h3>{header}</h3>
      </div>
      {children}
    </div>
  );
};

export default Widget;
