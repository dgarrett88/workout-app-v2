import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

import { capitalizeBody } from "../../services/capitalize";

const ButtonSm = ({ selected, apiData, buttonExpandState, searchSuggestion }) => {
  const [selectedState, setSelectedState] = useState(selected); // Which values have been selected from btn-lg
  const [data, setData] = useState(apiData); // The entire api data
  const [filteredData, setFilteredData] = useState([]); // Filtered results from btn-lg selections
  const [searchFiltered, setSearchFiltered] = useState([]); // Filtered results from search suggestions
  const [submitClicked, setSubmitClicked] = useState(false); // Tracks if submit button has been clicked
  const [loading, setLoading] = useState(false);
  const dynamicRefs = useRef([]);
  const buttonStateContent = useRef([]);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  useEffect(() => {
    setSelectedState(selected);
  }, [selected]);


// Tells this component which values 
// from btn-lg have been selected
// filters api data using selected values
const filterTheData = () => {
  const filtered = data.filter(
    (item) =>
    selectedState.includes(item.bodyPart) &&
    selectedState.includes(item.equipment)
    );
    
    // if values have been selected clear search bar results
    if (filtered.length > 0) {
      setSearchFiltered([]);
    }
    // setSearchFiltered([]);
    setFilteredData(filtered);

}
  useEffect(() => {
    setLoading(true);
    filterTheData();
    setLoading(false);
    setSubmitClicked(false);
  }, [data, selectedState]);

  // Search suggestion
useEffect(() => {
    setLoading(true);
    if(searchSuggestion.some(item => item.trim() !== '')) {
      const matchingResults = data.filter(item =>
        searchSuggestion.includes(item.bodyPart) ||
        searchSuggestion.includes(item.equipment) ||
        searchSuggestion.includes(item.name)
      );
      if (matchingResults.length > 0) {
        setFilteredData([]);
      }
      setSearchFiltered(matchingResults);
    }
    setLoading(false);
  }, [searchSuggestion, data]);



  useEffect(() => {
    const createButtonStates = (dataSet) => {
      return dataSet.map((item) => ({
        expanded: false,
        value: `${item.name}`,
      }));
    };
    
    if (filteredData.length > 0) {
      buttonStateContent.current = createButtonStates(filteredData);
    } else if (searchFiltered.length > 0) {
      buttonStateContent.current = createButtonStates(searchFiltered);
    }

    setButtonState(buttonStateContent.current);
  }, [filteredData, searchFiltered]);

  const [buttonState, setButtonState] = useState(buttonStateContent.current);

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

  const dataToRender = searchFiltered.length > 0 ? searchFiltered : filteredData;
  const shouldRender = searchFiltered.length > 0 ? true : submitClicked;

  return (
    <div className="button-sm-container">
      <div
        className={`submit-btn ${
          buttonExpandState.some((item) => item.expanded) ? "hidden" : ""
        }`}
        onClick={() => {
          setSubmitClicked(true)
          filterTheData()
        }}
      >
        GET WORKOUTS
      </div>
      {!loading && shouldRender &&
        dataToRender.map((myData, i) => (
          <div
            key={i}
            ref={(el) => (dynamicRefs.current[i] = el)}
            onClick={() => handleClick(i)}
            className="btn-sm-mapped-container"
          >
            <div className={`${buttonState[i]?.expanded ? "btn-sm" : "btn-sm-open"}`}>
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
            <div className={`${buttonState[i]?.expanded ? "open-animation-frame" : "close-animation-frame"}`}>
              <div className={`${buttonState[i]?.expanded ? "open-animation" : "close-animation"}`}>
                <img src={myData.gifUrl} alt={myData.name} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ButtonSm;
