import React, { useState, useEffect } from "react";
import Widget from "../UIELements/Widget";
import Input from "../UIELements/Input";
import Button from "../UIELements/Button";
import { getData, updateData } from "../Data/tools/getData";

import { randomColorGenerator } from "../UIELements/ui-tools/ui-tools";

import TransferIcon from "../UIELements/assets/icons/arrows.png";
import TransactionIcon from "../UIELements/assets/icons/briefcase.png";

import "./Content.css";

const log = console.log;
const Content = (props) => {
  const [currentBalance, updateCurrentBalance] = useState(5824.76);

  const [transactions, updateTransactions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    console.log(updateData());

    updateTransactions(updateData());
  }, []);

  return (
    <div className="content__container">
      <Widget
        header="Make a Transfer"
        width="20vw"
        classes="make-transfer-wdg"
        headerIcon={TransferIcon}
        headerIconAlt="transfer icon"
      >
        <form onSubmit={handleSubmit}>
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
            stylesForPrependSign={{
              display: "table",
              overflow: "hidden",
              width: "100%",
            }}
          />

          <Button type="submit" text="Submit" classes="make-transfer-btn" />
        </form>
      </Widget>

      <Widget
        header="Recent Transactions"
        width="55vw"
        headerIcon={TransactionIcon}
        headerIconAlt="transaction icon"
        classes="recent-transaction-wdg"
      >
        <div className="recent-transaction-wdg__wrapper">
          <div className="recent-transaction-wdg__filters recent-transaction-wdg__col">
            <Input
              type="text"
              placeholder="Search by typing..."
              classes="recent-transaction-wdg__filters-input"
              stylesForInputContainer={{ width: "45%", margin: "10px" }}
            />

            <ul className="recent-transaction-wdg__filters-ul">
              <strong className="recent-transaction-wdg__filters-sort-by-txt">
                <p>Sort by</p>
              </strong>

              {["DATE", "BENEFICIARY", "AMOUNT"].map((val, key) => {
                return (
                  <li key={key} className="recent-transaction-wdg__filters-li">
                    {val}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="recent-transaction-wdg__results recent-transaction-wdg__col">
            <ul className="recent-transaction-wdg__results-ul">
              {transactions.length > 0 &&
                transactions.map((obj, key) => {
                  const {
                    dates: { valueDate },
                    merchant: { name },
                    transaction: {
                      amountCurrency: { amount },
                      type,
                    },

                    imgData: { src, alt },
                  } = obj;

                  return (
                    <li
                      key={key}
                      className="recent-transaction-wdg__results-li"
                      style={{
                        borderLeft: `10px solid ${randomColorGenerator()}`,
                      }}
                    >
                      <div className="recent-transaction-wdg__results-li-row-one">
                        <p className="recent-transaction-wdg__results-li-row-one-date">
                          {valueDate}
                        </p>
                        <div className="recent-transaction-wdg__results-li-row-one-img-wrapper">
                          <img
                            className="recent-transaction-wdg__results-company-img"
                            src={src}
                            alt={alt}
                          />
                        </div>

                        <div
                          className="recent-transaction-wdg__results-li-row-one-transaction-info-wrapper"
                        >
                          <strong>
                            <p className="recent-transaction-wdg__results-li-row-one-transaction-info-name">
                              {name}
                            </p>
                          </strong>
                          <p className="recent-transaction-wdg__results-li-row-one-transaction-info-type">
                            {type}
                          </p>
                        </div>
                      </div>

                      <div className="recent-transaction-wdg__results-li-row-two">
                        <p>-${amount}</p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </Widget>
    </div>
  );
};

export default Content;
