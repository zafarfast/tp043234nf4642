import React from "react";

const StripeButton = () => {
  const handleClick = () => {
    window.open("https://buy.stripe.com/aEU3egamz1Vc5Jm144", "_blank");
  };

  return (
    <div>
      <button id="donate-button2" onClick={handleClick}>Support the project</button>
    </div>
  );
};

export default StripeButton;
