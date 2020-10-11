import React from "react";
import Widget from "../UIELements/Widget";

import "./Content.css";
const Content = (props) => {
  return (
    <div className="content__container">
      <Widget
        header="Make a Transfer"
        width="20vw"
        // height="400px"
        classes="make-transfer-wdg"
      >


      </Widget>

      <Widget header="Recent Transactions" width="55vw" classes='recent-transaction-wdg'></Widget>
    </div>
  );
};

export default Content;
