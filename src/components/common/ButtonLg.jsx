import React, { useRef, useEffect, useState } from "react";
import arrays from "../../assets/json/arrays.json";

const ButtonLg = ({ apiData, onSelectedChange }) => {
  const [selected, setSelected] = useState([]);
  const menuItems = arrays.menuItems;
  const dynamicRefs = useRef([]);

  // Mapping over top level of json creating 2 objects
  const buttonStateContent = menuItems.map((item) => ({
    expanded: false,
    value: `${item.id}`,
  }));

  // State to track which button is has been expanded (clicked)
  const [buttonState, setButtonState] = useState(buttonStateContent);

  const handleClick = (i) => {
    const newButtonState = [...buttonState];
    newButtonState[i] = {
      ...buttonState[i],
      expanded: true,
      clicked: true,
    };
    setButtonState(newButtonState);
  };

  const handleStateValue = (i, value) => {
    setSelected((selected) =>
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value]
    );
  };

  useEffect(() => {
    onSelectedChange(selected);
  }, [selected]);

  useEffect(() => {
    if (buttonState[0].expanded && !buttonState[1].expanded) {
      dynamicRefs.current[1].className = "hidden";
    } else if (buttonState[1].expanded && !buttonState[0].expanded) {
      dynamicRefs.current[0].className = "hidden";
    } else if (!buttonState[1].expanded && !buttonState[0].expanded) {
      dynamicRefs.current.forEach(
        (ref) => (ref.className = "button-lg inactive")
      );
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
