import React, { Fragment, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Button from "./Button";

import "./Modal.css";

const ModalOverlay = (props) => {
  const {
    data: { header, btnText, account, amount, msg },
    closeModal,
    disabled,
  } = props;

  useEffect(() => {}, []);

  const content = (
    <div className="modal__container">
      <h1 className="modal__header">{header}</h1>

      <div className="modal__body">

      {btnText === "Transfer" && (
          <table className="modal__table">
            <tbody>
              <tr>
                <th>Account</th>
                <th>Amount</th>
              </tr>
              <tr>
                <td>{account}</td>
                <td>${parseFloat(amount).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
      )}

      {btnText === 'Close' && <p className="modal__message">{msg}</p>}

      </div>


      <div className="modal__btn-wrapper">
        <Button
          type="text"
          text={btnText}
          classes="modal__make-transfer-modal-btn"
          onClick={() => closeModal(false)}
          disabled={disabled}
        />
      </div>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <Fragment>
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;