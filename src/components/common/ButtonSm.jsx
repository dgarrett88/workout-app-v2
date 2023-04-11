import React from "react";

import arrays from "../../assets/json/arrays.json"

const ButtonSm = () => {

  const menuItems = arrays.menuItems
console.log("SMALL BTN MENU ITEMS", menuItems)


  
  return (
  <div className="button-sm-container">
    {
      menuItems.map((item) => (
        <div key={item.id} className="button-sm">
          <p>{item.bodyParts}</p>

          <h5>diz a aych 5</h5>
        </div>
      ))
    }
  </div>
  );
};

export default ButtonSm;
