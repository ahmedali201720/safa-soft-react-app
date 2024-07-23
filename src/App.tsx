import Header from "./layout/header";
import "./assets/styles/app.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Complete from "./component/Complete";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Home />}></Route>
        <Route path="/complete" element={<Complete />}></Route>
      </Routes>
    </div>
  );
}

export default App;
