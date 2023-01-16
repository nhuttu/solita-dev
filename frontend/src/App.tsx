import React from "react";
import { Route, Routes } from "react-router-dom";
import Journey from "./views/journey/journey";
import Journeys from "./views/journey/journeys";
import Station from "./views/station/station";
import Stations from "./views/station/stations";

const App = () => {
  return (
    <Routes>
      <Route path="/journeys" element={<Journeys />} />
      <Route path="/journey/:id" element={<Journey />} />
      <Route path="/stations" element={<Stations />} />
      <Route path="/station/:id" element={<Station />} />
    </Routes>
  );
};

export default App;
