import { Link } from "react-router-dom";
import { IStation } from "../../utils/types";

interface StationProps {
  station: IStation;
}

/**
 * StationRow is responsible for rendering a single station row
 *
 * @param station A single station as a parameter
 * @returns JSX.Element
 */
const StationRow: React.FC<StationProps> = ({ station }) => {
  return (
    <>
      <tr>
        <td className="border px-4 py-2 underline ">
          <Link to={`/station/${station.id}`}>{station.nameFI}</Link>
        </td>
        <td className="border px-4 py-2 underline">
          <Link to={`/station/${station.id}`}>{station.nameSV}</Link>
        </td>
        <td className="border px-4 py-2">{station.cityFI}</td>
        <td className="border px-4 py-2">{station.citySV}</td>
        <td className="border px-4 py-2">{station.operator}</td>
        <td className="border px-4 py-2">{station.capacity}</td>
        <td className="border px-4 py-2">{station.coordinateX}</td>
        <td className="border px-4 py-2">{station.coordinateY}</td>
      </tr>
    </>
  );
};

export default StationRow;
