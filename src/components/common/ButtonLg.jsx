import React, { useRef, useEffect, useState } from "react";

import arrays from "../../assets/json/arrays.json";

import {
  allExercises,
  getByName,
  getBodyPart,
  getTargetMuscle,
  getEquipment,
} from "../../services/api";

const ButtonLg = () => {

  const menuItems = arrays.menuItems;
  const dynamicRefs = useRef([]);

  // Empty array, used to store mapped state objects
  let buttonStateContent = [];

  // Mapping over top level of json creating 2 objects
  const buttonStateContentMap = menuItems.map((item) => {

    // Pushing key value pairs to buttonStateContent array
    buttonStateContent.push({
      expanded: false,
      value: `${item.id}`,
    });
  });

  // State to track which button is has been expanded (clicked)
  const [buttonState, setButtonState] = useState(buttonStateContent);

  const handleExpandClick = (i) => {

    // Mapping over buttonState
    const updateButtonInState = buttonState.map((buttonState, index) => {
      if (i === index) {

        // Spreading values of clicked button state,
        // checking to see if current button state is expanded
        // if not change expanded value
        const newButtonState = {
          ...buttonState,
          expanded: !buttonState.expanded,
        };
        return newButtonState;
      } else {
        return buttonState;
      }
    });
    // Set new state with updated values
    setButtonState(updateButtonInState);
  };

  useEffect(() => {
    console.log("BUTTON STATE ---- ", buttonState);
    console.log("DYNAMIC REF 0 ---- ", dynamicRefs.current[0]);
    console.log("DYNAMIC REF 1 ---- ", dynamicRefs.current[1]);

    // Changing classes to hide inactive content
    if (buttonState[0].expanded === true && buttonState[1].expanded === false) {
      dynamicRefs.current[1].className = "hidden";
    } else if (
      buttonState[1].expanded === true &&
      buttonState[0].expanded === false
    ) {
      dynamicRefs.current[0].className = "hidden";
    } else if (
      buttonState[1].expanded === false &&
      buttonState[0].expanded === false
    ) {
      dynamicRefs.current[0].className = "button-lg inactive";
      dynamicRefs.current[1].className = "button-lg inactive";
    }
  }, [buttonState]);

  return (
    <div className="button-lg-container">
      {menuItems.map((item, i) => (
        <div
          key={i}
          type="button"
          // disabled
          className={`button-lg ${item.id} ${
            buttonState[i].expanded ? "active" : "inactive"
          } `}
          ref={(el) => (dynamicRefs.current[i] = el)}
          onClick={() => handleExpandClick(i)}
          // onClick={buttonState.expanded ? null : `${handleClick(i)}`}
        >
          <div
            className={`button-expand-list-header ${
              buttonState[i].expanded ? "" : "hidden"
            }`}
          >
            <div className="close-button-container">
              <div className="close-button">
                <p>X</p>
              </div>
            </div>
            <div className="button-expand-header-title-container">
              <h4>{item.id}</h4>
            </div>
          </div>
          {/* TEST */}

          {item.list.map((listItem) => (
            <div
              key={listItem}
              className={`button-expand-list ${
                buttonState[i].expanded ? "" : "hidden"
              }`}
            >
              <div className="button-expand-list-text-container">
                <p
                  className="button-expand-list-text"
                  htmlFor={listItem}
                  name={listItem}
                >
                  {listItem}
                </p>
              </div>
            </div>
          ))}

          {/* TEST END */}

          <div
            className={`button-lg-top ${
              buttonState[i].expanded ? "hidden" : ""
            }`}
          >
            <img src={item.image} alt={item.title} />
          </div>
          <div
            className={`button-lg-bottom ${
              buttonState[i].expanded ? "hidden" : ""
            }`}
          >
            <p>{item.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ButtonLg;
