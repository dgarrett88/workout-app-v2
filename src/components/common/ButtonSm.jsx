import React, {useState, useEffect} from "react";

const ButtonSm = ({selected, apiData}) => {
  const [selectedState, setSelectedState] = useState(selected);
  const [data, setData] = useState(apiData);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    setData(apiData);
  }, [apiData]);
  
  useEffect(() => {
    setSelectedState(selected);
  }, [selected]);

  useEffect(() => {
    const filtered = data.filter((myData) =>
      selectedState.includes(myData.bodyPart) || selectedState.includes(myData.equipment)
    );
    setFilteredData(filtered);
  }, [selectedState, data]);

  console.log("BTN-SM DATA STATE", data);
  console.log("BTN-SM SELECTED STATE", selectedState);
  
  return (
    <div className="button-sm-container">
      {filteredData.map((myData) => (
        <div key={myData.id} className="btn-sm">
          <p>{myData.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ButtonSm;
