import React, { useRef, useEffect, useState } from "react";

import arrays from "../../assets/json/arrays.json";

const ButtonLg = ({ onSelectedChange, onButtonExpandChange }) => {
  const [selected, setSelected] = useState([]);

  const menuItems = arrays.menuItems;
  const dynamicRefs = useRef([]);
  const wrapperRef = useRef(null);

  // Empty array, used to store mapped state objects
  let buttonStateContent = [];

  // Mapping over top level of json creating 2 properties to track
  const buttonStateContentMap = menuItems.map((item) => {
    buttonStateContent.push({
      expanded: false,
      value: `${item.id}`,
    });
  });

  // State to track which button has been expanded (clicked)
  const [buttonState, setButtonState] = useState(buttonStateContent);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setButtonState(buttonStateContent); // reset the button state
      setSelected([]); // reset the selected state
    }
  };

  const handleClick = (i) => {
    // Mapping over buttonState
    const updateButtonInState = buttonState.map((buttonState, index) => {
      if (i === index) {
        // Setting button properties to track when it has been clicked and expanded
        const newButtonState = {
          ...buttonState,
          expanded: true,
          clicked: true,
        };
        return newButtonState;
      } else {
        return buttonState;
      }
    });
    // Set new state with updated values
    setButtonState(updateButtonInState);
  };

  // Adds and removes values from selected array on click
  const handleStateValue = (i, value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Passing 'selected' & 'buttonState' state to parent component (Home.jsx)
  useEffect(() => {
    onSelectedChange(selected);
  }, [selected, onSelectedChange]);

  useEffect(() => {
    onButtonExpandChange(buttonState);
  }, [buttonState]);

  // Changing classes to hide inactive content
  useEffect(() => {
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
      dynamicRefs.current[0].className = "button-lg";
      dynamicRefs.current[1].className = "button-lg";
    }
  }, [buttonState]);

  return (
    <div className="button-lg-container" ref={wrapperRef}>
      {menuItems.map((item, i) => (
        <div
          key={i}
          type="button"
          // disabled
          className={`${
            buttonState[i].expanded ? "button-lg-expanded" : "button-lg"
          } `}
          ref={(el) => (dynamicRefs.current[i] = el)}
          onClick={buttonState[i].clicked ? null : () => handleClick(i)} // disable click event if button has been clicked
          >
          <div
            className={`${buttonState[i].expanded ? "button-expand-list-header" : "button-expand-list-header"}`}
          >
            <div className="close-button-container">
              <div
                className="close-button"
                onClick={() =>
                  setButtonState(
                    buttonState.map((buttonState, index) => {
                      if (i === index) {
                        return {
                          expanded: false,
                          value: `${item.id}`,
                          clicked: false, // reset the clicked property to false
                        };
                      } else {
                        return buttonState;
                      }
                    })
                  )
                }
              >
                <p>X</p>
              </div>
            </div>
            <div className="button-expand-header-title-container">
              <h4>{item.id}</h4>
            </div>
            <div className="spacer"></div>
          </div>
          {/* TEST */}

          {item.list.map((listItem) => (
            <div
              key={listItem}
              value={listItem}
              // clicked={}
              className={`${
                // ---------------------------------WORKING HERE-----------------------------------
                buttonState[i].expanded ? "button-expand-list" : "button-expand-list"
              } ${selected.includes(listItem) ? "clicked" : ""}`}
              // ---------------------------------WORKING HERE-----------------------------------
              onClick={() => handleStateValue(i, listItem)}
            >
              <div className="button-expand-list-text-container">
                <p className="button-expand-list-text">{listItem}</p>
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
