import React, {useState} from "react";

// Component Imports
import ButtonLg from "../../components/common/ButtonLg";
import ButtonSm from "../../components/common/ButtonSm";
import SearchBar from "../../components/common/SearchBar";

// Image imports
import logo from "../../assets/img/logo-mobile.svg"


const Home = ({apiData}) => {
    const [selected, setSelected] = useState([]);

    const[buttonExpandState, setButtonExpandState] = useState([]);

    const [selectedSuggestion, setSelectedSuggestion] = useState([]);

    const handleSelectedChange = (newSelected) => {
        setSelected(newSelected);
    }

    const handleExpandChange = (expanded) => {
        setButtonExpandState(expanded);
    }

    const handleSuggestionSelect = (suggestion) => {
        setSelectedSuggestion(suggestion);
    }


  return (
    <div className="home-container">
        <header className="header-logo">
            <img src={logo} alt="logo" />
        </header>
        <div>
            <SearchBar 
            apiData={apiData} 
            searchSuggestion={handleSuggestionSelect}
            />
        </div>
        <div className="main">
            <p className="main-text-top">Search by name</p>
            <div className="main-text-center">
                <hr className="left-row" />
                <p>or</p>
                <hr className="right-row" />
            </div>
            <p className="main-text-bottom">Click to choose your workout</p>
        </div>
            <ButtonLg 
                onSelectedChange={handleSelectedChange} 
                onButtonExpandChange={handleExpandChange}
            />
            <ButtonSm 
                selected={selected}
                searchSuggestion={selectedSuggestion}
                apiData={apiData} 
                buttonExpandState={buttonExpandState}
            />
        
    </div>
);
};

export default Home;
