import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const ButtonSm = ({ selected, apiData, buttonExpandState }) => {
  const [selectedState, setSelectedState] = useState(selected);
  const [data, setData] = useState(apiData);
  const [filteredData, setFilteredData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);

  const dynamicRefs = useRef([]);
  const [clickedRef, setClickedRef] = useState(null);

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

  function capitalizeBody(text) {
    const words = text.split(" ");
    const capitalizeLeBodyWords = words.map((word) => {
      const capitalizeLeBodyWord =
        word.charAt(0).toUpperCase() + word.slice(1);
      return capitalizeLeBodyWord;
    });

    const results = capitalizeLeBodyWords.join(" ");
    return results;
  }

  console.log("BTN-SM DATA STATE", data);
  console.log("BTN-SM SELECTED STATE", selectedState);
  console.log("BTN-SM FILTERED DATA", filteredData);

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
        filteredData.map((myData, index) => (
          <div
            key={myData.id}
            className={`btn-sm ${clickedRef === index ? "clicked" : ""}`}

            ref={(el) => (dynamicRefs.current[index] = { index, element: el })}
            onClick={() => setClickedRef(index)}

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
