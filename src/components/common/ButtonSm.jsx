import React, { useState, useEffect } from "react";

const ButtonSm = ({ selected, apiData }) => {
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
        selectedState.includes(item.bodyPart) ||
        selectedState.includes(item.equipment)
    );
    setFilteredData(filtered);
    setSubmitClicked(false);
  }, [data, selectedState]);

  console.log("BTN-SM DATA STATE", data);
  console.log("BTN-SM SELECTED STATE", selectedState);

  return (
    <div className="button-sm-container">
      <div className="submit-btn" onClick={() => setSubmitClicked(true)}>GET WORKOUTS</div>
      {submitClicked &&
        filteredData.map((myData) => (
          <div key={myData.id} className="btn-sm">
            <p>{myData.name}</p>
          </div>
        ))}
    </div>
  );
};

export default ButtonSm;
