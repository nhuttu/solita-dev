import { AxiosError } from "axios";
import { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  deleteStation,
  fetchStationById,
} from "../../services/station.service";
import { IStation } from "../../utils/types";
import Alert from "../alert";
/**
 * Station component is for viewing an existin station
 *
 * @returns JSX.Element
 */

const Station = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>({ message: "", type: "success" });

  const fetchStation = async (): Promise<IStation | undefined> => {
    if (id) {
      try {
        const res = await fetchStationById(id);
        return res;
      } catch (e) {
        let error = e as AxiosError;
        setNotification({
          message: `Something went wrong with the fetch!: ${error.message} `,
          type: "error",
        });
        setTimeout(() => setNotification(null), 3000);
      }
    }
  };

  const { data, error, refetch, isFetching } = useQuery<
    IStation | undefined,
    Error
  >("station", fetchStation);

  const { mutate, data: remove } = useMutation({ mutationFn: deleteStation });

  // Force refetch if ID changes meaning URL has changed
  useEffect(() => {
    refetch();
  }, [id, refetch]);

  console.log(remove);

  const handleDelete = () => {
    if (id) {
      mutate(Number(id), {
        onSuccess: () => {
          setNotification({
            type: "success",
            message: "Station deleted! Redirecting in 3..2..1",
          });
          setTimeout(() => {
            setNotification(null);
            navigate("/stations");
          }, 3000);
        },
        onError: () => {
          setNotification({
            type: "error",
            message: "Something went wrong with the deletion!",
          });
          setTimeout(() => setNotification(null), 3000);
        },
      });
    }
  };

  return (
    <Fragment>
      {notification && <Alert notification={notification} />}
      {data ? (
        <div className=" flex h-full flex-col items-center gap-6 " key={id}>
          <button
            className="rounded border-2 border-black"
            onClick={handleDelete}
          >
            Delete station
          </button>
          <span className="text-4xl">
            Station name: {data.nameFI} / {data.nameSV}
          </span>
          <span className="text-2xl">
            Station address: {data.addressFI} / {data.addressSV}
          </span>
          <span className="text-2xl">
            Journeys started from the station: {data.journeysStarted}
          </span>
          <span className="text-2xl">
            Journeys ended at the station: {data.journeysEnded}
          </span>
          <div className="flex flex-col gap-2">
            <span>
              Average distance that started from the station:
              {data.averageDistanceBegun?.toFixed(2)}
            </span>
            <span>
              Average distance that ended at the station:
              {data.averageDistanceEnded?.toFixed(2)}
            </span>
            <span></span>
          </div>
          <div className=" flex gap-5 text-2xl ">
            <div className="flex-1 ">
              Top 5 departure stations:
              {data.popularDepartures?.map((station) => {
                return (
                  <div key={station.id} className=" text-base ">
                    <Link to={`/station/${station.id}`}>
                      {station.nameFI} / {station.nameSV}
                    </Link>
                  </div>
                );
              })}
            </div>
            <div>
              Top 5 return stations:
              {data.popularReturns?.map((station) => {
                return (
                  <div key={station.id} className="text-base">
                    <Link to={`/station/${station.id}`}>
                      {station.nameFI} / {station.nameSV}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : isFetching ? (
        <div className="flex h-full justify-center">Fetching...</div>
      ) : error ? (
        <div className="h-full">Error: {error.message}</div>
      ) : (
        <div className="h-full">Data was not found with ID: {id}</div>
      )}
    </Fragment>
  );
};
export default Station;
