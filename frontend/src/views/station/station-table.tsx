import React from "react";
import { IStation } from "../../utils/types";
import StationRow from "./station-row";

interface StationsProps {
  stations: IStation[];
}

const StationTable: React.FC<StationsProps> = ({ stations }) => {
  return (
    <table className=" mb-5 w-max table-auto border-collapse items-center justify-center">
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
