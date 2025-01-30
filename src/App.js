import React,{useEffect} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TeamList from "./components/TeamList";
import TeamDetails from "./components/TeamDetails";
import Players from "./components/Players.jsx";
import Stats from "./components/Stats.jsx";
import Play from "./gaming/Play.jsx";
const App = () => {
  useEffect(()=>{
    document.body.className="bg-gray-900"
  })
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TeamList />} />
        <Route path="/details" element={<TeamDetails />} />
     <Route path="/players" element={<Players/>} />
  <Route path="/stats" element={<Stats />} />
  <Route path="/play" element={<Play  />} /> 
      </Routes>
    </Router>
  );
};

export default App;
