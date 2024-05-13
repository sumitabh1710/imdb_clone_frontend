import React from "react";
import "./Popup.css";

const Popup = ({ setShow, children }) => {
  return (
    <div
      className="main_popup_container"
      onClick={() => {
        setShow(false);
      }}
    >
      <div
        className="popup_content_container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Popup;
