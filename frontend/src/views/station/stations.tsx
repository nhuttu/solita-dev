import { useQuery } from "react-query";
import { fetchStations } from "../../services/station.service";
import { IStation } from "../../utils/types";
import StationTable from "./station-table";

const Stations = () => {
  const { data, error, isFetching } = useQuery<IStation[], Error>({
    queryKey: ["stations"],
    queryFn: fetchStations,
    retry: false,
  });

  return (
    <div className="flex min-h-full items-center justify-center">
      {isFetching ? (
        <p>Fetching</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <StationTable stations={data ?? []} />
      )}
    </div>
  );
};

export default Stations;
