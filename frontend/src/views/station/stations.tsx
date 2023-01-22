import { useQuery } from "react-query";
import { fetchStations } from "../../services/station.service";
import { IStation } from "../../utils/types";
import StationTable from "./station-table";

const Stations = () => {
  const stationQueryFn = async (): Promise<IStation[] | undefined> => {
    try {
      const response = await fetchStations();

      return response;
    } catch (e) {
      console.log(e, "Something went wrong with the fetch");
    }
  };

  const { data, isFetching } = useQuery<IStation[] | undefined, Error>({
    queryKey: ["stations"],
    queryFn: stationQueryFn,
  });

  return (
    <div className="flex min-h-full items-center justify-center">
      {isFetching ? <p>Fetching</p> : <StationTable stations={data ?? []} />}
    </div>
  );
};

export default Stations;
