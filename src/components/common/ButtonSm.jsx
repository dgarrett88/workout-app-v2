import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const ButtonSm = ({ selected, apiData, buttonExpandState }) => {
  const [selectedState, setSelectedState] = useState(selected);
  const [data, setData] = useState(apiData);
  const [filteredData, setFilteredData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);
  const dynamicRefs = useRef([]);
  const buttonStateContent = useRef([]);

  // Update if api data changes (shouldn't happen after first call)
  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  // Update 'selected' state based on which 'btn-lg' has been clicked
  useEffect(() => {
    setSelectedState(selected);
  }, [selected]);

  // Filtering through api data and storing objects that match
  // specified conditions to 'filteredData' state 
  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        selectedState.includes(item.bodyPart) &&
        selectedState.includes(item.equipment)
    );
    setFilteredData(filtered);
    setSubmitClicked(false);
  }, [data, selectedState]);

  // Initialize buttonStateContent array when filteredData changes
  useEffect(() => {
    buttonStateContent.current = filteredData.map((item) => ({
      expanded: false,
      value: `${item.name}`,
    }));
    setButtonState(buttonStateContent.current);
  }, [filteredData]);

  // State to store trackable attributes (expanded, clicked)
  const [buttonState, setButtonState] = useState(buttonStateContent.current);

  // Maps over buttonState and sets trackable attributes (expanded, clicked)
  const handleClick = (i) => {
    setButtonState((prevButtonState) => {
      const updatedButtonState = prevButtonState.map((button, index) => {
        if (i === index) {
          return {
            ...button,
            expanded: !button.expanded,
            clicked: true,
          };
        }
        return button;
      });
      return updatedButtonState;
    });
  };

  // Capitalize first letter of each word
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
