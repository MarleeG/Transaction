import React from "react";
import Widget from "../UIELements/Widget";
import TransferIcon from '../UIELements/assets/icons/arrows.png'
import TransactionIcon from '../UIELements/assets/icons/briefcase.png';

import "./Content.css";
const Content = (props) => {
  return (
    <div className="content__container">
      <Widget
        header="Make a Transfer"
        width="20vw"
        classes="make-transfer-wdg"
        // headerIcon={TransferIcon}
        headerIcon={TransferIcon}

        headerIconAlt="transfer icon"
      >


      </Widget>

      <Widget 
      header="Recent Transactions" 
      width="55vw" 
      headerIcon={TransactionIcon}
      headerIconAlt="transaction icon"

      
      classes='recent-transaction-wdg'></Widget>
    </div>
  );
};

export default Content;
