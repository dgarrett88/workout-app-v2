import React, {useState, useEffect} from "react";
import axios from "axios";

const ButtonSm = ({selected, apiData}) => {

  const [selectedState, setSelectedState] = useState([]);

  const [data, setData] = useState([apiData])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiData);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiData]);
  
console.log("BTN-SM DATA STATE", data);
  
  return (
  <div className="button-sm-container">
    hello
  </div>
  );
};

export default ButtonSm;
