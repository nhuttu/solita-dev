import { Link } from "react-router-dom";
import { IJourney } from "../../utils/types";

interface JourneyProps {
  journey: IJourney;
}

/**
 * JourneyRow is a component that renders a single Journey row
 *
 * @param Journey Props include a single journey
 *
 * @returns {JSX.Element} Returns a JSX element
 */
const JourneyRow: React.FC<JourneyProps> = ({ journey }) => {
  return (
    <>
      <tr>
        <td className="border px-4 py-2 underline">
          <Link to={`/journey/${journey.id}`}>{journey.id}</Link>
        </td>
        <td className="border px-4 py-2 underline">
          <Link to={`/station/${journey.departureStation?.id}`}>
            {journey.departureStation?.nameFI}
          </Link>
        </td>
        <td className="border px-4 py-2 underline">
          <Link to={`/station/${journey.returnStation?.id}`}>
            {journey.returnStation?.nameFI}
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
