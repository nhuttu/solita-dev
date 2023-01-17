import React from "react";
import { IJourney } from "../../utils/types";
import JourneyRow from "./journey-row";

const JourneyTable = (props: { journeys: IJourney[] }) => {
  return (
    <table className="flex flex-col">
      <tbody>
        <tr>
          <th>Departure</th>
          <th>Return</th>
          <th>Departure station ID</th>
          <th>Return station ID</th>
          <th>Covered distance</th>
          <th>Duration</th>
        </tr>
        {props.journeys.map((i) => (
          <JourneyRow {...i} key={i.id} />
        ))}
      </tbody>
    </table>
  );
};

export default JourneyTable;
