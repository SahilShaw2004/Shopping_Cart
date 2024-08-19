import React from "react";
import Home from "./components/Home";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import Details from "./components/Details";

function App() {
  const {search,pathname}=useLocation();
  return (
    <div className="h-screen w-screen flex">
      {(pathname!="/" || search.length>0) && (<Link to="/" className="text-red-400 absolute left-[17%] top-[5%]">
        Home</Link> )}
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/details/:id" element={<Details/>}/>
      </Routes>


      
    </div>
  );
}

export default App;
