import React, { useRef, useEffect, useState } from "react";

import arrays from "../../assets/json/arrays.json";



const ButtonLg = ({apiData, onSelectedChange}) => {
  const [selected, setSelected] = useState([]);

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

  const handleClick = (i) => {
    // Mapping over buttonState
    const updateButtonInState = buttonState.map((buttonState, index) => {
      if (i === index) {

        const newButtonState = {
          ...buttonState,
          expanded: true,
          clicked: true, // set a new property to track if the button has been clicked
        };
        return newButtonState;
      } else {
        return buttonState;
      }
    });
    // Set new state with updated values
    setButtonState(updateButtonInState);
  };


  const handleStateValue = (i, value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  useEffect(() => {
    // Call the onSelectedChange function passed from the parent with the new selected state value
    onSelectedChange(selected);
  }, [selected, onSelectedChange]);

  useEffect(() => {
    console.log("BUTTON STATE ---- ", buttonState);
    console.log("DYNAMIC REF 0 ---- ", dynamicRefs.current[0]);
    console.log("DYNAMIC REF 1 ---- ", dynamicRefs.current[1]);
    console.log("SELECTED", selected);

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

    if  (selected.includes.value) {
      
    }
  }, [buttonState, selected]);

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
          // onClick={() => handleClick(i)}
          onClick={buttonState[i].clicked ? null : () => handleClick(i)} // disable click event if button has been clicked
        >
          <div
            className={`button-expand-list-header ${
              buttonState[i].expanded ? "" : "hidden"
            }`}
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
          </div>
          {/* TEST */}

          {item.list.map((listItem) => (
            <div
              key={listItem}
              value={listItem}
              // clicked={}
              className={`button-expand-list listItem ${
                buttonState[i].expanded ? "" : "hidden"
              } ${selected.includes(listItem) ? "clicked" : ""}`}
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
