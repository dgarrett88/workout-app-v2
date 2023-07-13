import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

import { capitalizeBody } from "../../services/capitalize";

const ButtonSm = ({ selected, apiData, buttonExpandState, searchResults }) => {
  const [selectedState, setSelectedState] = useState(selected); 
  const [data, setData] = useState(apiData); 
  const [filteredData, setFilteredData] = useState([]); 
  const [searchFiltered, setSearchFiltered] = useState([]); 
  const [submitClicked, setSubmitClicked] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const dynamicRefs = useRef([]);
  const buttonStateContent = useRef([]);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);

  useEffect(() => {
    setSelectedState(selected);
  }, [selected]);

  const filterTheData = () => {
    const filtered = data.filter(
      (item) =>
        selectedState.includes(item.bodyPart) &&
        selectedState.includes(item.equipment)
    );

    if (filtered.length > 0) {
      setSearchFiltered([]);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    setLoading(true);
    filterTheData();
    setLoading(false);
    setSubmitClicked(false);
  }, [data, selectedState]);

  useEffect(() => {
    setLoading(true);
    if(searchResults.some(item => typeof item === 'string' && item.trim() !== '')) {
      const matchingResults = data.filter(item =>
        searchResults.includes(item.bodyPart) ||
        searchResults.includes(item.equipment) ||
        searchResults.includes(item.name)
      );
      if (matchingResults.length > 0) {
        setFilteredData([]);
      }
      setSearchFiltered(matchingResults);
    }
    setLoading(false);
  }, [searchResults, data]);

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
          if(filteredData.length === 0) {
            setShowMessage(true);
            setTimeout(() => {
              setShowMessage(false);
            }, 3000);
          }
        }}
      >
        GET WORKOUTS
      </div>
      {filteredData.length === 0 && submitClicked && showMessage && 
        <p>Please select a <span className="green-span">body part</span> AND <span className="green-span">equipment</span></p>
      }
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
