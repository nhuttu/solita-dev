import React from "react";
import { IJourney } from "../../utils/types";
import JourneyRow from "./journey-row";

const JourneyTable = (props: { journeys: IJourney[] }) => {
  return (
    <table className="table-auto border-collapse">
      <tbody>
        <tr>
          <th className="px-4 py-2 text-left">Departure</th>
          <th className="px-4 py-2 text-left">Return</th>
          <th className="px-4 py-2 text-left">Departure station</th>
          <th className="px-4 py-2 text-left">Return station </th>
          <th className="px-4 py-2 text-left">Covered distance</th>
          <th className="px-4 py-2 text-left">Duration</th>
        </tr>
        {props.journeys.map((i) => (
          <JourneyRow {...i} key={i.id} />
        ))}
      </tbody>
    </table>
  );
};

export default JourneyTable;
