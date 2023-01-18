import React from "react";
import { IJourney } from "../../utils/types";
import JourneyRow from "./journey-row";

interface JourneysProps {
  journeys: IJourney[];
}

const JourneyTable: React.FC<JourneysProps> = ({ journeys }) => {
  return (
    <table className=" mb-5 table-auto border-collapse items-center justify-center">
      <tbody>
        <tr>
          <th className="px-4 py-2 text-left">Departure station</th>
          <th className="px-4 py-2 text-left">Return station </th>
          <th className="px-4 py-2 text-left">Covered distance (km)</th>
          <th className="px-4 py-2 text-left">Duration (m)</th>
        </tr>
        {journeys.map((journey) => (
          <JourneyRow journey={journey} key={journey.id} />
        ))}
      </tbody>
    </table>
  );
};

export default JourneyTable;
