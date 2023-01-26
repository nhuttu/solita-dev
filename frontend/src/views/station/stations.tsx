import { ChangeEvent, Fragment, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchStations } from "../../services/station.service";
import { IStation } from "../../utils/types";
import StationTable from "./station-table";

const Stations = () => {
  const { data, error, isFetching } = useQuery<IStation[] | undefined, Error>({
    queryKey: ["stations"],
    queryFn: fetchStations,
    retry: false,
  });

  const [filter, setFilter] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="min-h-full">
      {isFetching ? (
        <p>Fetching</p>
      ) : error ? (
        <p>{error.message}</p>
      ) : data ? (
        <>
          <div className="flex items-center justify-center gap-4">
            Filter by name (FI)
            <input
              className="rounded border-2 border-black "
              type="text"
              onChange={handleInputChange}
            />
            <button className="rounded border-2 border-black">
              <Link to="/station">Create new station</Link>
            </button>
          </div>
          <div className="flex  ">
            <StationTable
              stations={
                data?.filter((station) => station.nameFI.includes(filter)) ?? []
              }
            />
            )
          </div>
        </>
      ) : (
        <p>No data nor error</p>
      )}
    </div>
  );
};

export default Stations;
