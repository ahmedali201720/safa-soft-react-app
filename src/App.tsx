import React, { useEffect, useState } from "react";
import Header from "./layout/header";
import "./assets/styles/app.scss";
import Nav from "./component/Nav";
import About from "./component/about";
import Company from "./component/Company";
import Logo from "./component/Logo";
import Confirmation from "./component/Confirmation";

function App() {
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [codes, setCodes] = useState([]);
  const getCountries = () => {
    fetch("/api/country-by-name.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setCountries(data);
      });
  };

  const getDialCodes = () => {
    fetch("/api/country-by-calling-code.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setCodes(data);
      });
  };

  const getCites = () => {
    fetch("/api/country-by-cities.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        setCities(data);
      });
  };

  const changeStep = (step: number) => {
    setStep(step);
  };

  useEffect(() => {
    getCountries();
    getDialCodes();
    getCites();
  }, []);

  return (
    <div className="App">
      <Header></Header>
      <main id="main" className="theme_container">
        <div className="stepper_container">
          <Nav step={step}></Nav>
          <div className="theme_step_container">
            {step === 1 && (
              <About
                countries={countries}
                cities={cities}
                codes={codes}
                next={changeStep}
              ></About>
            )}
            {step === 2 && (
              <Company
                countries={countries}
                cities={cities}
                codes={codes}
                next={changeStep}
              ></Company>
            )}
            {step === 3 && <Logo next={changeStep}></Logo>}
            {step === 4 && <Confirmation next={changeStep}></Confirmation>}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
