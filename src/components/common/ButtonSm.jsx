import React, { useState, useEffect } from "react";

import chevron from '../../assets/img/chevron.png'

const ButtonSm = ({ selected, apiData, buttonExpandState }) => {
  const [selectedState, setSelectedState] = useState(selected);
  const [data, setData] = useState(apiData);
  const [filteredData, setFilteredData] = useState([]);
  const [submitClicked, setSubmitClicked] = useState(false);

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

  

  console.log("BTN-SM DATA STATE", data);
  console.log("BTN-SM SELECTED STATE", selectedState);
  console.log("BTN-SM FILTERED DATA", filteredData);

  return (
    <div className="button-sm-container">
      <div className={`submit-btn ${
        buttonExpandState.some((item) => item.expanded) ? "hidden" : ""
      }`} onClick={() => setSubmitClicked(true)}>GET WORKOUTS</div>
      {submitClicked &&
        filteredData.map((myData) => (
          <div key={myData.id} className="btn-sm">
            <div className="btn-sm-left">
              <p>{myData.bodyPart}</p>
              <p>{myData.equipment}</p>
            </div>
            <div className="btn-sm-mid">
              <p>{myData.name}</p>
            </div>
            <div className="btn-sm-right">
              <img src={chevron} alt="chevron" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default ButtonSm;
