import { Link } from "react-router-dom";
import { IJourney } from "../../utils/types";

interface JourneyProps {
  journey: IJourney;
}

const JourneyRow: React.FC<JourneyProps> = ({ journey }) => {
  return (
    <>
      <tr>
        <td className="border px-4 py-2">
          <Link to={`/station/${journey.returnStation.id}`}>
            {journey.returnStation.nameFI}
          </Link>
        </td>
        <td className="border px-4 py-2">
          <Link to={`/station/${journey.departureStation.id}`}>
            {journey.departureStation.nameFI}
          </Link>
        </td>
        <td className="border px-4 py-2">
          {(journey.coveredDistance / 1000).toFixed(2)}
        </td>
        <td className="border px-4 py-2">
          {(journey.duration / 60).toFixed(2)}
        </td>
      </tr>
    </>
  );
};

export default JourneyRow;
