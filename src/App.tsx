import React from "react";
import Header from "./layout/header";
import "./assets/styles/app.scss";
import Nav from "./component/Nav";
import Company from "./component/Company";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <main id="main" className="theme_container">
        <div className="stepper_container">
          <Nav></Nav>
          <div className="theme_step_container">
            <Company></Company>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
