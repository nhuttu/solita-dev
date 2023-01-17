import { IJourney } from "../../utils/types";

const JourneyRow = (props: IJourney) => {
  return (
    <>
      <tr>
        <td className="border px-4 py-2">{props.return}</td>
        <td className="border px-4 py-2">{props.departure}</td>
        <td className="border px-4 py-2">{props.returnStation.nameFI}</td>
        <td className="border px-4 py-2">{props.departureStation.nameFI}</td>
        <td className="border px-4 py-2">{props.coveredDistance}</td>
        <td className="border px-4 py-2">{props.duration}</td>
      </tr>
    </>
  );
};

export default JourneyRow;
