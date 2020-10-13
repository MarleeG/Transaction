import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import _ from "lodash";

import Widget from "../UIELements/Widget";
import Input from "../UIELements/Input";
import Button from "../UIELements/Button";
import Modal from "../UIELements/Modal";

import {
  getData,
  updatedData,
  generateDropdownOptions,
  addData,
} from "../Data/tools/getData";

// Images
import TransferIcon from "../UIELements/assets/icons/arrows.png";
import TransactionIcon from "../UIELements/assets/icons/briefcase.png";

import UpArrow from "../UIELements/assets/icons/up-arrow.png";
import DownArrow from "../UIELements/assets/icons/down-arrow.png";

import "./Content.css";

const log = console.log;
const Content = (props) => {
  const [currentBalance, updateCurrentBalance] = useState(5824.76);
  const [currentKeyCode, updateCurrentKeyCode] = useState(null);

  const [transactions, updateTransactions] = useState([]);

  const [dropdownOptions, updateDropdownOptions] = useState([]);

  const [modal, handleModal] = useState({
    show: false,
    header: "",
    btnText: "",
  });

  const [pageUpdate, handlePageUpdate] = useState(true);

  const [selectedSort, updateSelectedSort] = useState("");
  const [sortByIcon, updateSortByIcon] = useState({
    order: "asc",
    src: "",
    alt: "",
  });

  const [sortBeneIcon, updateSortBeneIcon] = useState({
    order: "asc",
    src: "",
    alt: "",
  });

  const [sortAmountIcon, updateSortAmountIcon] = useState({
    order: "asc",
    src: "",
    alt: "",
  });

  const sortByDate = useCallback(
    (updated) => {
      log("Sorting by Date...");
      log(transactions);

      const data = updated || transactions;
      const sortedDatesEarliest = _.orderBy(data, ["dates.valueDate"], ["asc"]);

      const sortedDatesRecent = _.orderBy(data, ["dates.valueDate"], ["desc"]);

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

        // others
        updateSortAmountIcon({
          ...sortAmountIcon,
          order: "asc",
          src: UpArrow,
          alt: "up-arrow",
        });
        updateSortBeneIcon({
          ...sortBeneIcon,
          order: "asc",
          src: UpArrow,
          alt: "up-arrow",
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

        // others
        updateSortAmountIcon({
          ...sortAmountIcon,
          order: "dsc",
          src: DownArrow,
          alt: "down-arrow",
        });
        updateSortBeneIcon({
          ...sortBeneIcon,
          order: "dsc",
          src: DownArrow,
          alt: "down-arrow",
        });

        log("sortedDatesRecent ", sortedDatesRecent);
      }

      log(
        "-----------------------------------------------------------------------------------------"
      );

      handlePageUpdate(false);

      // pageUpdate, transactions, sortByIcon
      // sortByIcon, pageUpdate, 
    },
    [transactions]
  );

  const sortByBeneficiary = useCallback(
    (updated) => {
      log("Sorting by Beneficiary...");

      const data = updated || transactions;
      const sortedByOrder = _.orderBy(data, ["merchant.name"], ["asc"]);

      const sortedByReverseOrder = _.orderBy(data, ["merchant.name"], ["desc"]);

      if (sortBeneIcon.order === "asc") {
        updateTransactions(sortedByOrder);
        handlePageUpdate(true);

        updateSortBeneIcon({
          ...sortBeneIcon,
          order: "dsc",
          src: DownArrow,
          alt: "down-arrow",
        });

        // others
        updateSortByIcon({
          ...sortByIcon,
          order: "asc",
          src: UpArrow,
          alt: "up-arrow",
        });

        updateSortAmountIcon({
          ...sortAmountIcon,
          order: "asc",
          src: UpArrow,
          alt: "up-arrow",
        });
      } else if (sortBeneIcon.order == "dsc") {
        log(sortBeneIcon.order);
        updateTransactions(sortedByReverseOrder);
        handlePageUpdate(true);

        updateSortBeneIcon({
          ...sortBeneIcon,
          order: "asc",
          src: UpArrow,
          alt: "up-arrow",
        });

        // others
        updateSortByIcon({
          ...sortByIcon,
          order: "dsc",
          src: DownArrow,
          alt: "down-arrow",
        });

        updateSortAmountIcon({
          ...sortAmountIcon,
          order: "dsc",
          src: DownArrow,
          alt: "down-arrow",
        });
      }

      handlePageUpdate(false);
    },

    // sortBeneIcon, pageUpdate
    [transactions]
  );

  const sortByAmount = useCallback(
    (updated) => {
      log("Sorting by Amount...");

      log("Sorting by Date...");

      const data = updated || transactions;
      const sortBySmallest = _.orderBy(
        data,
        ["transaction.amountCurrency.amount"],
        ["asc"]
      );

      const sortByLargest = _.orderBy(
        data,
        ["transaction.amountCurrency.amount"],
        ["desc"]
      );

      if (sortAmountIcon.order === "asc") {
        log(sortAmountIcon.order);
        updateTransactions(sortBySmallest);
        handlePageUpdate(true);

        updateSortAmountIcon({
          ...sortAmountIcon,
          order: "dsc",
          src: DownArrow,
          alt: "down-arrow",
        });

        // others
        updateSortByIcon({
          ...sortByIcon,
          order: "asc",
          src: UpArrow,
          alt: "up-arrow",
        });

        updateSortBeneIcon({
          ...sortBeneIcon,
          order: "asc",
          src: UpArrow,
          alt: "up-arrow",
        });

        log("sortBySmallest ", sortBySmallest);
      } else if (sortAmountIcon.order === "dsc") {
        log(sortAmountIcon.order);
        updateTransactions(sortByLargest);
        handlePageUpdate(true);

        updateSortAmountIcon({
          ...sortAmountIcon,
          order: "asc",
          src: UpArrow,
          alt: "up-arrow",
        });

        // others
        updateSortByIcon({
          ...sortByIcon,
          order: "dsc",
          src: DownArrow,
          alt: "down-arrow",
        });

        updateSortBeneIcon({
          ...sortBeneIcon,
          order: "dsc",
          src: DownArrow,
          alt: "down-arrow",
        });
      }

      handlePageUpdate(false);
    },

    // sortAmountIcon, pageUpdate
    [transactions]
  );

  const sortHandler = (selected) => {
    updateSelectedSort(selected);

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
    // log('TRANS')
    // log(trans)
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

            // log(obj)

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
                    {src && alt && (
                      <img
                        className="recent-transaction-wdg__results-company-img"
                        src={src}
                        alt={alt}
                      />
                    )}
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
                  <p>-${parseFloat(amount).toFixed(2)}</p>
                </div>
              </li>
            );
          })}
      </ul>
    );
  };

  // dropdown
  const [toAccountDropdownVal, updateToAccountDropdown] = useState("");

  // Inputs
  const [amountInputVal, updateAmountInput] = useState(0);

  const [searchByInputVal, updateSearchByInput] = useState("");

  const handleAddData = () => {
    log("ADD DATA");

    const {
      categoryCode,
      transaction: {
        amountCurrency: { currencyCode },
        type,
        creditDebitIndicator,
      },
      imgData: { src, alt },

      merchant: { name, accountNumber },
    } = transactions.find((obj) => obj.merchant.name === toAccountDropdownVal);

    const obj = transactions.find(
      (obj) => obj.merchant.name === toAccountDropdownVal
    );

    const currentDate = Date.parse(new Date());

    let value = {
      categoryCode: categoryCode,
      dates: {
        valueDate: currentDate,
      },
      imgData: {
        name: obj.imgData.name,
        src,
        alt,
      },
      transaction: {
        amountCurrency: {
          amount: parseFloat(parseFloat(amountInputVal).toFixed(2)),
          currencyCode: currencyCode,
        },
        type: type,
        creditDebitIndicator: creditDebitIndicator,
      },

      merchant: {
        name: name,
        accountNumber: accountNumber,
      },
    };

    //update

    addData(value);
    // let upd = updatedData();

    // const sortedDatesEarliest = _.orderBy(updatedData(), ["dates.valueDate"], ["asc"]);

      const sortedDatesRecent = _.orderBy(updatedData(), ["dates.valueDate"], ["desc"]);

    updateTransactions(sortedDatesRecent);

    // log(upd);
    // updateTransactions();

    // if (selectedSort === "DATE") {
    //   // sortHandler("DATE");
    //   sortByDate(updatedData());
    // } else if (selectedSort === "BENEFICIARY") {
    //   sortByBeneficiary(updatedData());
    // } else if (selectedSort === "AMOUNT") {
    //   sortByAmount(updatedData());
    // }

    // sortHandler("DATE");

    // updateSortByIcon({
    //   ...sortByIcon,
    //   order: "dsc",
    //   src: DownArrow,
    //   alt: "down-arrow",
    // });

    // updateSortByIcon({
    //   ...sortByIcon,
    //   order: "asc",
    //   src: UpArrow,
    //   alt: "up-arrow",
    // });

    // sortByDate();

    

    // handlePageUpdate(true);
  };

  const modalHandler = (bool) => {
    if (bool) {
      if (!modal.show) {
        if (
          toAccountDropdownVal !== "" &&
          amountInputVal > 0 &&
          toAccountDropdownVal !== null
        ) {
          handleModal({
            ...modal,
            show: true,
            header: "Confirm Transfer",
            btnText: "Transfer",
            account: toAccountDropdownVal,
            amount: parseFloat(amountInputVal),
            reset: true,
          });
        } else {
          if (
            (toAccountDropdownVal === "" && amountInputVal === 0) ||
            toAccountDropdownVal === null
          ) {
            // if both fields are empty
            handleModal({
              ...modal,
              show: true,
              header: "Error",
              btnText: "Close",
              msg:
                "Please select an account from the dropdown and enter an amount.",
              reset: false,
            });
          } else if (toAccountDropdownVal === "" && amountInputVal > 0) {
            // if dropdown value is empty and amountInputVal has a value larger than 0
            handleModal({
              ...modal,
              show: true,
              header: "Error",
              btnText: "Close",
              msg: "Please select an account from the dropdown",
              reset: false,
            });
          } else if (toAccountDropdownVal !== "" && amountInputVal === 0) {
            // if dropdown has a value and amountInputVal value is 0
            handleModal({
              ...modal,
              show: true,
              header: "Error",
              btnText: "Close",
              msg: "Please enter an amount.",
              reset: false,
            });
          }
        }
      }
    } else {
      handleModal({ ...modal, show: false });

      // subtract current balance from from what the user selected

      // log(`reset: ${modal.reset}`)

      if (modal.reset) {
        updateAmountInput(0);
        updateToAccountDropdown(null);
      }
    }
  };

  const handleCloseModal = () => {
    modalHandler(false);

    if (modal.reset) {
      handleAddData();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    log(`Make transfer widget values`);
    log(`to account: ${toAccountDropdownVal}`);
    log(`amount: ${amountInputVal}`);

    modalHandler(true);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    const isNumber =
      currentKeyCode === 48 ||
      currentKeyCode === 49 ||
      currentKeyCode === 50 ||
      currentKeyCode === 51 ||
      currentKeyCode === 52 ||
      currentKeyCode === 53 ||
      currentKeyCode === 54 ||
      currentKeyCode === 55 ||
      currentKeyCode === 56 ||
      currentKeyCode === 57;

    const isBackspace = currentKeyCode === 8;
    // const isDash = currentKeyCode === 173;
    const isDot = currentKeyCode === 190;

    // name="amountInput"
    // name="searchByInput"
    switch (name) {
      case "amountInput":
        if (isDot && amountInputVal.toString().split("").indexOf(".") === -1) {
          updateAmountInput(value);
        } else if (isNumber || isBackspace) {
          updateAmountInput(value);
        }
        break;

      case "searchByInput":
        updateSearchByInput(value);
        break;

      default:
        // adjust this later
        alert("err");
    }
  };

  const keyDown = (e) => {
    const { keyCode } = e;

    updateCurrentKeyCode(keyCode);
  };

  const generateDropdownOptions = () => {
    let transactionList = transactions;
    let options = [];
    let allNames = [];

    for (let i = 0; i < transactionList.length; i++) {
      let obj = transactionList[i];

      if (allNames.indexOf(obj.merchant.name) === -1) {
        options.push({ value: obj.merchant.name, label: obj.merchant.name });

        allNames.push(obj.merchant.name);
      }
    }

    console.log(options);

    return options;
  };

  const handleDropdownChange = (e, dropdownSelected) => {
    const { value } = e;

    log("dropdown...");
    log(e);

    log(`toAccountDropdown: ${value}`);

    log(`dropdownSelected: ${dropdownSelected}`);

    log("-------------------");

    switch (dropdownSelected) {
      case "toAccountDropDown":
        updateToAccountDropdown(value);
        break;
      default:
        handleModal({
          ...modal,
          show: true,
          header: "Error",
          btnText: "Close",
          msg: "Please select a valid option.",
          reset: true,
        });
    }
  };

  // const clearSearchByInput = () => {
  //   updateSearchByInput("")
  // }

  const handleDropdownKeyDown = (e) => {
    log(e.key);
  };

  useEffect(() => {
    if (pageUpdate) {
      updateTransactions(updatedData());
      handlePageUpdate(false);

    }

    updateDropdownOptions(generateDropdownOptions());
  }, [transactions]);

  return (
    <div className="content__container">
      <Modal show={modal.show} data={modal} closeModal={handleCloseModal} />
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
            showInput={true}
          />

          <Input
            label="TO ACCOUNT"
            type="text"
            placeholder="Georgia Power Electric Company"
            // name="toAccountInput"
            // val={toAccountInputVal}
            // handleChange={handleChange}
            // onKeyDown={keyDown}
            showInput={false}
            classes="input__toAccount"
          />

          {dropdownOptions.length > 0 && (
            <Select
              options={dropdownOptions}
              value={dropdownOptions.filter(
                ({ value }) => value === toAccountDropdownVal
              )}
              width="50px"
              // value={toAccountDropdownVal}
              menuColor="slate"
              className="make-transfer-wdg__react-select-container"
              onChange={(e) => handleDropdownChange(e, "toAccountDropDown")}

              // onKeyDown={handleDropdownKeyDown}
            />
          )}

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
            name="amountInput"
            val={amountInputVal}
            handleChange={handleChange}
            onKeyDown={keyDown}
            showInput={true}
          />

          <Button
            type="submit"
            text="Submit"
            classes="make-transfer-btn"
            disabled={modal.show}
          />
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
              classesForPrependSign="recent-transaction-wdg__filters-prepend-sign"
              stylesForInputContainer={{ width: "45%", margin: "10px" }}
              name="searchByInput"
              val={searchByInputVal}
              handleChange={handleChange}
              onKeyDown={keyDown}
              showInput={true}
              updateSearchByInput={updateSearchByInput}
              prependSign="X"
              stylesForPrependSign={{
                display: "table",
                overflow: "hidden",
                width: "100%",
              }}
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

                      {val === "DATE" &&
                        (sortByIcon.src !== "" ? (
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
                        ))}

                      {val === "BENEFICIARY" &&
                        (sortBeneIcon.src !== "" ? (
                          <img
                            src={sortBeneIcon.src}
                            alt={sortBeneIcon.alt}
                            className="recent-transaction-wdg__filters-li-sort-by-icon"
                          />
                        ) : (
                          <img
                            src={UpArrow}
                            alt="up-arrow"
                            className="recent-transaction-wdg__filters-li-sort-by-icon"
                          />
                        ))}

                      {val === "AMOUNT" &&
                        (sortAmountIcon.src !== "" ? (
                          <img
                            src={sortAmountIcon.src}
                            alt={sortAmountIcon.alt}
                            className="recent-transaction-wdg__filters-li-sort-by-icon"
                          />
                        ) : (
                          <img
                            src={UpArrow}
                            alt="up-arrow"
                            className="recent-transaction-wdg__filters-li-sort-by-icon"
                          />
                        ))}
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
