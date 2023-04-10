import React, {useRef, useEffect, useState} from "react";

import arrays from "../../assets/json/arrays.json";

const ButtonLg = () => {

  
  const menuItems = arrays.menuItems;
  const dynamicRefs = useRef([]);
  
  
  let buttonStateContent = [];
  const buttonStateContentMap = menuItems.map((item) => {
    buttonStateContent.push({
      disabled: false,
      // value: "",
    });
  });
  
  const [buttonState, setButtonState] = useState(buttonStateContent); 
  


  const handleClick = (i) => {
    const updateButtonInState = buttonState.map((buttonState, index) => {
      if (i === index) {
        const newButtonState = {
          ...buttonState,
          disabled: !buttonState.disabled
        };
        return newButtonState;
      } else {
        return buttonState;
      };
    });
    setButtonState(updateButtonInState);
  };

  useEffect(() => {
    console.log(buttonState);
  },[])


  return (
    <div className="button-lg-container">
      {menuItems.map((item, i) => (
        <div key={i} 
        type="button"
        // disabled
             className={`button-lg ${buttonState[i].disabled ? "active" : "" }`}
            ref={(el) => (dynamicRefs.current[i] = el)}
             onClick={() => handleClick(i)}
            >

          {/* TEST */}

          

          {/* TEST */}

          <div className="button-lg-top">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="button-lg-bottom">
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ButtonLg;
