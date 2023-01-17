import { useParams } from "react-router";
import { IJourney } from "../../utils/types";

const Journey = () => {
  const { id } = useParams();
  return <div>Hello from journey view</div>;
};

export default Journey;
