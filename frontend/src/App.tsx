import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./views/footer";
import Header from "./views/header";
import Home from "./views/home";
import Journey from "./views/journey/journey";
import Journeys from "./views/journey/journeys";
import NotFound from "./views/not-found";
import Station from "./views/station/station";
import Stations from "./views/station/stations";

const App = () => {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/journeys" element={<Journeys />} />
        <Route path="/journey/:id" element={<Journey />} />
        <Route path="/stations" element={<Stations />} />
        <Route path="/station/:id" element={<Station />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Fragment>
  );
};

export default App;
