import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinkTailWind = "h-max w-20 rounded flex justify-center items-center";
  const navLinkActiveTailWind = " bg-white text-black";
  return (
    <header className=" h- mb-4 flex h-12 items-center justify-center gap-12  bg-black font-thin text-white ">
      <NavLink
        className={({ isActive }) =>
          isActive ? navLinkTailWind + navLinkActiveTailWind : navLinkTailWind
        }
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? navLinkTailWind + navLinkActiveTailWind : navLinkTailWind
        }
        to="/journeys"
      >
        Journeys
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          isActive ? navLinkTailWind + navLinkActiveTailWind : navLinkTailWind
        }
        to="/stations"
      >
        Stations
      </NavLink>
    </header>
  );
};

export default Header;
