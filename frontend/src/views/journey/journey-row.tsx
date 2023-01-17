import { IJourney } from "../../utils/types";

const JourneyRow = (props: IJourney) => {
  return (
    <>
      <tr>
        <td>{props.return}</td>
        <td>{props.departure}</td>
        <td>{props.returnStation.nameFI}</td>
        <td>{props.departureStation.nameFI}</td>
        <td>{props.coveredDistance}</td>
        <td>{props.duration}</td>
      </tr>
    </>
  );
};

export default JourneyRow;
