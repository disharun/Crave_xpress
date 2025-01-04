import React from "react";
import "./AppDownload.css";
import { assets } from "../../assets/assets";
import DeliveryTracking from "../DeliveryTracking/DeliveryTracking";

const AppDownload = () => {
  return (
    <div className="app-download" id="app-download">
      <DeliveryTracking/>
    </div>
  );
};

export default AppDownload;
