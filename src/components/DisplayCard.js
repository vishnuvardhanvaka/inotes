import React from "react";
import "../css/DisplayContainer.css";

export default function DisplayCard() {
  return (
    <div className="shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px,rgb(209,213,219)_0px_0px_0px_1px_inset] h-[220px] flex items-center justify-center w-[220px] m-2.5">
      <img
        src={
          "https://i.pinimg.com/736x/7f/13/95/7f1395c37cfa644b802786964dfbe5d7.jpg"
        }
        alt="Reload page"
        className="h-40"
      />
    </div>
  );
}
