import React from "react";
import { Route, Routes } from "react-router-dom";
import Journeys from "./views/journey/journeys";

const App = () => {
  return (
    <Routes>
      <Route path="/journeys" element={<Journeys />} />
    </Routes>
  );
};

export default App;
