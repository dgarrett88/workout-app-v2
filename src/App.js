// React
import React, {useState, useEffect} from "react";

// Styling
import './sass/index.scss';

// Page Imports
import Home from "./pages/home/Home";

// Services
import {allExercises} from './services/api';
import arrays from './assets/json/arrays.json';



function App() {

  const [apiData, setApiData] = useState([])


  useEffect(() => {
    async function loadEndpoint() {
      const res = await allExercises()
      const data = res.data;
      setApiData(data);
    }
    loadEndpoint()
  }, [])


  return (
    <div className="App">

      <Home 
      apiData={apiData}
      arrays={arrays} />
     
     
    </div>
  );
}

export default App;
