import { Link } from "react-router-dom";
import { IStation } from "../../utils/types";

interface StationProps {
  station: IStation;
}

const StationRow: React.FC<StationProps> = ({ station }) => {
  return (
    <>
      <tr>
        <td className="border px-4 py-2">{station.nameFI}</td>
        <td className="border px-4 py-2">{station.nameSV}</td>
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
