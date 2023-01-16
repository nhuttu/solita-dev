import { useParams } from "react-router";
import { IStation } from "../../utils/types";

const Station = () => {
  const { id } = useParams();
  return (
    <div>
      Hello from station
      <p>{id}</p>
    </div>
  );
};
export default Station;
