import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import SlotsAvailable from "./components/SlotsAvailable";
import MySlots from "./components/MySlots";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/myslots" element={<MySlots />} />
          <Route exact path="/" element={<Login />} />
          <Route path="/read" element={<Read />} />
          <Route path="/edit/:id" element={<Update />} />
          <Route path="/signin" element={<Create />} />
          <Route path="/slots-aval" element={<SlotsAvailable />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;