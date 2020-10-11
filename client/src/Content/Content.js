import React, { useState } from "react";
import Widget from "../UIELements/Widget";
import TransferIcon from "../UIELements/assets/icons/arrows.png";
import TransactionIcon from "../UIELements/assets/icons/briefcase.png";

import "./Content.css";
import Input from "../UIELements/Input";
const Content = (props) => {
  const [currentBalance, updateCurrentBalance] = useState(5824.76);
  return (
    <div className="content__container">
      <Widget
        header="Make a Transfer"
        width="20vw"
        classes="make-transfer-wdg"
        headerIcon={TransferIcon}
        headerIconAlt="transfer icon"
      >
        <form>
          <Input
            label="FROM ACCOUNT"
            type="text"
            placeholder={`Free Checking(4692) - $${currentBalance}`}
            val={`Free Checking(4692) - $${currentBalance}`}
            disabled
          />

          <Input
            label="TO ACCOUNT"
            type="text"
            placeholder="Georgia Power Electric Company"
          />

          <Input
            label="AMOUNT"
            type="text"
            placeholder="0.00"
            prependSign="$"
            stylesForPrependSign={{ display: "table", overflow: "hidden", width: "100%"}}
          />

          
        </form>
      </Widget>

      <Widget
        header="Recent Transactions"
        width="55vw"
        headerIcon={TransactionIcon}
        headerIconAlt="transaction icon"
        classes="recent-transaction-wdg"
      ></Widget>
    </div>
  );
};

export default Content;
