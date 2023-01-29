import { ChangeEvent, Fragment, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import FileModal from "../../modals/file-modal";
import { fetchStations } from "../../services/station.service";
import { IStation } from "../../utils/types";
import StationTable from "./station-table";

/**
 * Stations component is responsible for rendering all stations
 *
 * @returns JSX.Element
 */
const Stations = () => {
  const { data, error, isFetching, status } = useQuery<
    IStation[] | undefined,
    Error
  >({
    queryKey: ["stations"],
    queryFn: fetchStations,
  });

  const [modalOpen, setModalOpen] = useState(false);

  const [filter, setFilter] = useState("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div className="min-h-full ">
      {isFetching ? (
        <div className="flex items-center justify-center">Fetching</div>
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
          <div className="flex justify-center">
            {data.length > 0 && status === "success" ? (
              <StationTable
                stations={data.filter((station) =>
                  station.nameFI.includes(filter)
                )}
              />
            ) : (
              <button
                className="gap-3 rounded border-2 border-black"
                onClick={() => setModalOpen(true)}
              >
                Upload a CSV file
              </button>
            )}
          </div>
        </>
      ) : (
        <p>No data nor error</p>
      )}
      {modalOpen && <FileModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default Stations;
