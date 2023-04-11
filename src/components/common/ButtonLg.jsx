import React, { useRef, useEffect, useState } from "react";

import arrays from "../../assets/json/arrays.json";

import {
  allExercises,
  getByName,
  getBodyPart,
  getTargetMuscle,
  getEquipment,
} from "../../services/api";

import Checkbox from "./Checkbox";

const ButtonLg = () => {
  const menuItems = arrays.menuItems;
  const dynamicRefs = useRef([]);

  let buttonStateContent = [];
  const buttonStateContentMap = menuItems.map((item) => {
    buttonStateContent.push({
      expanded: false,
      // value: `${item.id}`
    });
  });

  const [buttonState, setButtonState] = useState(buttonStateContent);

  const handleClick = (i) => {
    const updateButtonInState = buttonState.map((buttonState, index) => {
      if (i === index) {
        const newButtonState = {
          ...buttonState,
          expanded: !buttonState.expanded,
        };
        return newButtonState;
      } else {
        return buttonState;
      }
    });
    setButtonState(updateButtonInState);
  };

  const menuSplit = menuItems.map((list) => list.list);

  const bodyPartList = menuSplit[0];
  const equipmentList = menuSplit[1];
  console.log("BODY PART LIST ---- ", bodyPartList);
  console.log("EQUIPMENT LIST ---- ", equipmentList);

  useEffect(() => {
    console.log("BUTTON STATE ---- ", buttonState);
    console.log("DYNAMIC REF 0 ---- ", dynamicRefs.current[0]);
    console.log("DYNAMIC REF 1 ---- ", dynamicRefs.current[1]);
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
          onClick={() => handleClick(i)}
        >
          {/* TEST */}

          {item.list.map((listItem) => (
            <div key={listItem} className="button-expand-list">
              <div className="button-expand-list-label-container">
                <label className="button-expand-list-label" htmlFor={item.list}>
                  {listItem}
                </label>
              </div>
              <div className="button-expand-list-checkbox-container">
                <input
                  className="button-expand-list-checkbox"
                  type="checkbox"
                  name={item.list}
                  value={listItem}
                />
              </div>
            </div>
          ))}

          {/* TEST */}

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
