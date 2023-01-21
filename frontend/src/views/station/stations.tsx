import { useState } from "react";
import { useQuery } from "react-query";
import { fetchStations } from "../../services/station.service";
import { IStation } from "../../utils/types";
import StationTable from "./station-table";

const Stations = () => {
  const [stations, setStations] = useState<IStation[]>([]);

  const journeyQueryFn = async () => {
    try {
      const response = await fetchStations();

      setStations(response);
      return response;
    } catch (e) {
      console.log(e, "Something went wrong with the fetch");
    }
  };

  const { isFetching } = useQuery<IStation[], Error>({
    queryKey: ["journeys"],
    queryFn: journeyQueryFn,
  });

  return (
    <div className="flex min-h-full items-center justify-center">
      {isFetching ? <p>Fetching</p> : <StationTable stations={stations} />}
    </div>
  );
};

export default Stations;
