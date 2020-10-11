import React, { useState, useEffect, useCallback } from "react";
import moment from 'moment';
import _ from 'lodash';

import Widget from "../UIELements/Widget";
import Input from "../UIELements/Input";
import Button from "../UIELements/Button";
import { getData, updateData } from "../Data/tools/getData";

import { randomColorGenerator } from "../UIELements/ui-tools/ui-tools";

import TransferIcon from "../UIELements/assets/icons/arrows.png";
import TransactionIcon from "../UIELements/assets/icons/briefcase.png";

import UpArrow from "../UIELements/assets/icons/up-arrow.png";
import DownArrow from "../UIELements/assets/icons/down-arrow.png";

import "./Content.css";

const log = console.log;
const Content = (props) => {
  const [currentBalance, updateCurrentBalance] = useState(5824.76);

  const [transactions, updateTransactions] = useState([]);
  const [pageUpdate, handlePageUpdate] = useState(true);
  const [sortByIcon, updateSortByIcon] = useState({
    order: "asc",
    src: "",
    alt: "",
  });

  const sortByDate = useCallback(() => {
    log("Sorting by Date...");

    const sortedDatesEarliest = _.orderBy(transactions, ['dates.valueDate'], ['asc']);

    const sortedDatesRecent = _.orderBy(transactions, ['dates.valueDate'], ['desc']);

    if (sortByIcon.order === "asc") {
      log(sortByIcon.order);
      updateTransactions(sortedDatesEarliest);
    handlePageUpdate(true);


      updateSortByIcon({
        ...sortByIcon,
        order: "dsc",
        src: DownArrow,
        alt: "down-arrow",
      });

      log("sortedDatesEarliest ", sortedDatesEarliest);

    } else if (sortByIcon.order === "dsc") {
      log(sortByIcon.order);
      updateTransactions(sortedDatesRecent);
    handlePageUpdate(true);


      updateSortByIcon({
        ...sortByIcon,
        order: "asc",
        src: UpArrow,
        alt: "up-arrow",
      });

      log("sortedDatesRecent ", sortedDatesRecent);
    }

    log(
      "-----------------------------------------------------------------------------------------"
    );

    handlePageUpdate(false);


    // pageUpdate, transactions, sortByIcon
  }, [sortByIcon, pageUpdate]);

  const sortByBeneficiary = () => {
    log("Sorting by Beneficiary...");
  };

  const sortByAmount = () => {
    log("Sorting by Amount...");
  };

  const sortHandler = (selected) => {
    switch (selected) {
      case "DATE":
        sortByDate();
        break;
      case "BENEFICIARY":
        sortByBeneficiary();
        break;
      case "AMOUNT":
        sortByAmount();
        break;
      default:
        sortByDate();
    }
  };

  const recentTransactionsUL = (trans) => {
    return (
      <ul className="recent-transaction-wdg__results-ul">
        {trans.length > 0 &&
          trans.map((obj, key) => {
            const {
              categoryCode,
              dates: { userDate },
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
                  borderLeft: `10px solid ${categoryCode}`,
                }}
              >
                <div className="recent-transaction-wdg__results-li-row-one">
                  <p className="recent-transaction-wdg__results-li-row-one-date">
                    {userDate}
                  </p>
                  <div className="recent-transaction-wdg__results-li-row-one-img-wrapper">
                    <img
                      className="recent-transaction-wdg__results-company-img"
                      src={src}
                      alt={alt}
                    />
                  </div>

                  <div className="recent-transaction-wdg__results-li-row-one-transaction-info-wrapper">
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
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (pageUpdate) {
      updateTransactions(updateData());
      handlePageUpdate(false);
    }
  }, [transactions]);

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
                  <li
                    key={key}
                    className="recent-transaction-wdg__filters-li"
                    onClick={() => sortHandler(val)}
                  >
                    <span>
                      {val}

                      {val === "DATE" ? (
                        sortByIcon.src !== "" ? (
                          <img
                            src={sortByIcon.src}
                            alt={sortByIcon.alt}
                            className="recent-transaction-wdg__filters-li-sort-by-icon"
                          />
                        ) : (
                          <img
                            src={UpArrow}
                            alt="up-arrow"
                            className="recent-transaction-wdg__filters-li-sort-by-icon"
                          />
                        )
                      ) : (
                        <img
                          src={UpArrow}
                          alt="up-arrow"
                          className="recent-transaction-wdg__filters-li-sort-by-icon"
                        />
                      )}

                      {/* {sortByIcon.src !== "" ? (
                        <img
                          src={sortByIcon.src}
                          alt={sortByIcon.alt}
                          className="recent-transaction-wdg__filters-li-sort-by-icon"
                        />
                      ) : (
                        <img
                          src={UpArrow}
                          alt="up-arrow"
                          className="recent-transaction-wdg__filters-li-sort-by-icon"
                        />
                      )} */}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="recent-transaction-wdg__results recent-transaction-wdg__col">
            {transactions.length > 0 && recentTransactionsUL(transactions)}
          </div>
        </div>
      </Widget>
    </div>
  );
};

export default Content;
