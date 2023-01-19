import { useState } from "react";
import { useQuery } from "react-query";
import { fetchStations } from "../../services/station.service";
import { IStation } from "../../utils/types";
import StationTable from "./station-table";

const Stations = () => {
  const [page, setPage] = useState(0);
  const [stations, setStations] = useState<IStation[]>([]);
  console.log(stations);
  const journeyQueryFn = async () => {
    try {
      const response = await fetchStations();

      setStations(response);
      return response;
    } catch (e) {
      console.log(e, "Something went wrong with the fetch");
    }
  };

  const { error, isFetching, data, status } = useQuery<IStation[], Error>({
    queryKey: ["journeys"],
    queryFn: journeyQueryFn,
    getNextPageParam: (currentPage) => {
      return currentPage.length === 50 && page + 1;
    },
    getPreviousPageParam: () => {
      return page !== 0 ? page - 1 : undefined;
    },
  });
  return (
    <div className="flex min-h-full items-center justify-center">
      {isFetching ? <p>Fetching</p> : <StationTable stations={stations} />}
    </div>
  );
};

export default Stations;
