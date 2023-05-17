import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const ButtonSm = ({ selected, apiData, buttonExpandState }) => {
  const [selectedState, setSelectedState] = useState(selected);
  const [data, setData] = useState(apiData);
  const [filteredData, setFilteredData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const dynamicRefs = useRef([]);
  let buttonStateContent = [];

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  useEffect(() => {
    setSelectedState(selected);
  }, [selected]);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        selectedState.includes(item.bodyPart) &&
        selectedState.includes(item.equipment)
    );
    setFilteredData(filtered);
    setSubmitClicked(false);
  }, [data, selectedState]);

  useEffect(() => {
    // Initialize buttonStateContent array when filteredData changes
    buttonStateContent = filteredData.map((item) => ({
      expanded: false,
      value: `${item.name}`,
    }));
    setButtonState(buttonStateContent);
  }, [filteredData]);

  const [buttonState, setButtonState] = useState(buttonStateContent);

  const handleClick = (i) => {
    // Mapping over buttonState
    const updateButtonInState = buttonState.map((buttonState, index) => {
      if (i === index) {
        // Setting button properties to track when it has been clicked and expanded
        const newButtonState = {
          ...buttonState,
          clicked: true,
        };
  
        // Toggle the expanded attribute
        if (buttonState.clicked) {
          newButtonState.expanded = false;
        } else {
          newButtonState.expanded = true;
        }
  
        return newButtonState;
      } else {
        return buttonState;
      }
    });
    // Set new state with updated values
    setButtonState(updateButtonInState);
  };
  

  useEffect(() => {
    console.log(buttonState);
  }, [buttonState]);

  function capitalizeBody(text) {
    const words = text.split(" ");
    const capitalizeLeBodyWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const results = capitalizeLeBodyWords.join(" ");
    return results;
  }

  return (
    <div className="button-sm-container">
      <div
        className={`submit-btn ${
          buttonExpandState.some((item) => item.expanded) ? "hidden" : ""
        }`}
        onClick={() => setSubmitClicked(true)}
      >
        GET WORKOUTS
      </div>
      {submitClicked &&
        filteredData.map((myData, i) => (
          <div
            key={i}
            ref={(el) => (dynamicRefs.current[i] = el)}
            onClick={() => handleClick(i)}
            className="btn-sm"
          >
            <div className="btn-sm-left">
              <p>{capitalizeBody(myData.bodyPart)}</p>
              <p>{capitalizeBody(myData.equipment)}</p>
            </div>
            <div className="btn-sm-right">
              <div className="top-spacer"></div>
              <div className="btn-sm-mid">
                <p>{capitalizeBody(myData.name)}</p>
              </div>
              <div className="btn-sm-chevron">
                <FaChevronDown />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ButtonSm;
