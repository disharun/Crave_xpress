import React, { useState, useEffect } from "react";
import "./DeliveryTracking.css";
import person from "../../assets/person.png";

const DeliveryTracking = () => {
  const [deliveryPosition, setDeliveryPosition] = useState(0);
  const pathLength = 100; 

  useEffect(() => {
    const interval = setInterval(() => {
      setDeliveryPosition((prevPosition) => {
        if (prevPosition >= pathLength) {
          return 0; 
        }
        return prevPosition + 0.5; 
      });
    }, 80); 
    
    return () => clearInterval(interval);
  }, []); 

  return (
    <div className="delivery-tracking">
      <div className="tracking-info">
        <p>Your food is on the way! 🛵</p>
        <p>Tracking the delivery boy...</p>
      </div>
      <div className="tracking-path">
        <div
          className="delivery-boy"
          style={{
            left: `${(deliveryPosition / pathLength) * 100}%`, // Move the delivery boy along the path
            transition: "left 0.1s ease-out", // Smooth transition for movement
          }}
        >
          <div className="delivery-boy-icon">
            <img src={person} alt="Delivery Boy" />
          </div>
        </div>
        <div className="path-indicator"></div>
      </div>
      <div className="tracking-progress">
        <span>{Math.round((deliveryPosition / pathLength) * 100)}%</span> {/* Display progress */}
      </div>
    </div>
  );
};

export default DeliveryTracking;
