// React
import React, {useState, useEffect} from "react";

// Styling
import './sass/index.scss';

// Page Imports
import Home from "./pages/home/Home";
import ButtonLg from "./components/common/ButtonLg";

// Services
import {allExercises} from './services/api';
import arrays from './assets/json/arrays.json';



function App() {



  return (
    <div className="App">

      <Home 
      apiData={allExercises}
      arrays={arrays} />
      {/* <ButtonLg /> */}
     
    </div>
  );
}

export default App;
