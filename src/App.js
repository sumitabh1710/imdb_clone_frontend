import logo from "./logo.svg";
import "./App.css";
import Home from "./component/Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./component/Edit/Edit";
import Details from "./component/Details/Details";
import Add from "./component/Add/Add";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
