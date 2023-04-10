import React, {useState, useEffect} from "react";

import {allExercises, getByName, getBodyPart, getTargetMuscle,
 getEquipment} from "../../services/api";

 import arrays from "../../assets/json/arrays.json"

// Component Imports
import ButtonLg from "../../components/common/ButtonLg";
import ButtonSm from "../../components/common/ButtonSm";
import SearchBar from "../../components/common/SearchBar";

// Image imports
import logo from "../../assets/img/logo-mobile.svg"
const Home = () => {


    useEffect(() => {
        // allExercises()
    }, [])


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
            <ButtonLg/>
            <ButtonSm/>
        
    </div>
);
};

export default Home;
