import React from "react";
import { IStation } from "../../utils/types";
import StationRow from "./station-row";

interface StationsProps {
  stations: IStation[];
}

/**
 * StationTable is a functional react component that renders a table of station data.
 *
 * @param {IStation[]} stations - An array of IStation objects representing the station data to be displayed in the table.
 *
 * @returns {JSX.Element} - A JSX table element with the station data.
 */
const StationTable: React.FC<StationsProps> = ({ stations }) => {
  return (
    <table className=" mb-5 h-full w-full table-auto border-collapse ">
      <tbody>
        <tr>
          <th className="px-4 py-2 text-left">Name (FI)</th>
          <th className="px-4 py-2 text-left">Name (SV) </th>
          <th className="px-4 py-2 text-left">City (FI)</th>
          <th className="px-4 py-2 text-left">City (SV)</th>
          <th className="px-4 py-2 text-left">Operator</th>
          <th className="px-4 py-2 text-left">Capacity</th>
          <th className="px-4 py-2 text-left">X-coordinate</th>
          <th className="px-4 py-2 text-left">Y-coordinate</th>
        </tr>
        {stations.map((station) => (
          <StationRow station={station} key={station.id} />
        ))}
      </tbody>
    </table>
  );
};

export default StationTable;
