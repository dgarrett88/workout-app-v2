// React
import React, {useState, useEffect} from "react";

// Styling
import './sass/index.scss';

// Page Imports
import Home from "./pages/home/Home";
import ButtonLg from "./components/common/ButtonLg";



function App() {



  return (
    <div className="App">

      <Home />
      {/* <ButtonLg /> */}
     
    </div>
  );
}

export default App;
