import React from "react";

import arrays from "../../assets/json/arrays.json"

const ButtonSm = () => {

  const menuItems = arrays.menuItems
console.log(menuItems, "LLLLLL")
  
  return (
  <div className="button-sm-container">
    {
      menuItems.map((item) => (
        <div key={item} className="button-sm">
          <p>{item.bodyParts}</p>
        </div>
      ))
    }
  </div>
  );
};

export default ButtonSm;
