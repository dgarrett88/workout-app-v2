import React, {useState} from "react";

// Component Imports
import ButtonLg from "../../components/common/ButtonLg";
import ButtonSm from "../../components/common/ButtonSm";
import SearchBar from "../../components/common/SearchBar";

// Image imports
import logo from "../../assets/img/logo-mobile.svg"


const Home = ({apiData}) => {
    const [selected, setSelected] = useState([]);

    const handleSelectedChange = (newSelected) => {
        setSelected(newSelected);
    }


  return (
    <div className="home-container">
        <header className="header-logo">
            <img src={logo} alt="logo" />
        </header>
        <section>
            <SearchBar />
        </section>
        <article>
            <p className="article-top">Search for body parts, muscles or equipment</p>
            <section className="article-center">
                <hr className="left-row" />
                <p>or</p>
                <hr className="right-row" />
            </section>
            <p className="article-bottom">Click to choose your workout</p>
        </article>
            <ButtonLg 
                onSelectedChange={handleSelectedChange} 
            />
            <ButtonSm 
                selected={selected}
                apiData={apiData} 
            />
        
    </div>
);
};

export default Home;
