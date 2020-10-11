import React from "react";

import "./Widget.css";

const Widget = (props) => {
  const { width, header, classes, headerIcon, headerIconAlt, children } = props;

  const styles = {
    width: width
  };

  return (
    <div className={`widget__container ${classes}`}>
      <div className="widget__header-wrapper" style={styles}>
        <span className="widget-header-icon">
          <img src={headerIcon} alt={headerIconAlt}/>
        </span>
        <h3>{header}</h3>
      </div>
      {children}
    </div>
  );
};

export default Widget;
