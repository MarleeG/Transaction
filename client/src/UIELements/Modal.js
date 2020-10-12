import React, { Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
// import Backdrop from "./Backdrop";

const ModalOverlay = (props) => {
  const {} = props;

  useEffect(() => {}, []);

  const content = <div></div>;

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <Fragment>
      {/* {props.show && (
          <Backdrop onClick={props.onHide} style={{ zIndex: 105 }} />
        )} */}

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