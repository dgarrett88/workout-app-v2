import React, {useState, useEffect} from "react";

import arrays from "../../assets/json/arrays.json"

const ButtonSm = ({selected}) => {

  const [selectedState, setSelectedState] = useState([selected]);

  // console.log("BTN SM SELECTED DATA", selected)


  
  return (
  <div className="button-sm-container">
   <div className="button-sm">
    
   </div>
  </div>
  );
};

export default ButtonSm;
