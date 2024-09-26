import React from "react";
import "./style.css";
import vector1 from "./vector-1.svg";
import vector3 from "./vector-3.svg";

export const Iphone = () => {
  return (
    <div className="iphone">
      <div className="div">
        <div className="overlap">
          <img className="img" alt="Vector" src={vector1} />
        </div>
        <img className="vector-2" alt="Vector" src={vector3} />
        <div className="frame-2">
          <div className="rectangle" />
          <div className="rectangle-2" />
          <div className="rectangle-3" />
        </div>
        <div className="BOX-wrapper">
          <div className="BOX">断捨離boxへ送る</div>
        </div>
      </div>
    </div>
  );
};