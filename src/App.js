import React,{useEffect} from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import TeamList from "./components/TeamList";
import TeamDetails from "./components/TeamDetails";
import Players from "./components/Players.jsx";
import Stats from "./components/Stats.jsx";
import Play from "./gaming/Play.jsx";
import Results from "./components/Results";
import History from "./components/History";
import Standings from "./components/Standings";
import Card from "./components/Card.jsx"
import Auction from "./auction/Auction.jsx";
import Bid from "./tournament/Bid.jsx";
import Game from "./tournament/Game.jsx";
import Team from "./tournament/Team.jsx";
import Fixtures from "./tournament/Fixtures.jsx";
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
<Route path="/history" element={<History />}/>
  <Route path="/standings" element={<Standings />}/>
<Route path="/results" element={<Results />}/>
<Route path="/profile" element={<Card />}/>
<Route path="/auction" element={<Auction />}/>
<Route path="/bid" element={<Bid />} />
<Route path="/game" element={<Game  />} />
<Route path="/team" element={<Team />} />
<Route path="/fixtures" element={<Fixtures />} />
      </Routes>
    </Router>
  );
};

export default App;
