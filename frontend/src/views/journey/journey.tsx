import { Fragment, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import {
  deleteJourney,
  fetchJourneyById,
} from "../../services/journey.service";
import { IJourney } from "../../utils/types";
import Alert from "../alert";

const Journey = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>({ message: "", type: "success" });

  const fetchJourney = async () => {
    if (id) {
      try {
        const res = await fetchJourneyById(id);
        return res;
      } catch (e) {
        console.log(e, "Something went wrong with the fetch");
      }
    }
  };

  const { data, error } = useQuery<IJourney, Error>({
    queryKey: ["journey"],
    queryFn: fetchJourney,
  });

  const { mutate } = useMutation({ mutationFn: deleteJourney });

  const handleDelete = () => {
    if (id) {
      mutate(Number(id), {
        onSuccess: () => {
          setNotification({
            type: "success",
            message: "Journey deleted! Redirecting in 3..2..1",
          });
          setTimeout(() => {
            setNotification(null);
            navigate("/journeys");
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
        <div className="flex h-full flex-col items-center gap-6 ">
          <button
            className="rounded border-2 border-black "
            onClick={handleDelete}
          >
            Delete journey
          </button>
          <span className="text-4xl"> Journey number: {id}</span>
          <span className="text-2xl">
            This journey started from: {data?.departureStation?.nameFI}
          </span>
          <span className="text-2xl">
            This journey ended at: {data?.returnStation?.nameFI}
          </span>
          <span className="text-1xl">
            Journey departure: {data.departure.split("T")[0]} at{" "}
            {data.departure.split("T")[1]}
          </span>
          <span className="text-1xl">
            Journey return: {data.return.split("T")[0]} at{" "}
            {data.return.split("T")[1]}
          </span>
          <span className="text-1xl">
            Journey duration: {(data.duration / 60).toFixed(2)} minutes
          </span>
          <span className="text-1xl">
            Journey covered distance: {(data.coveredDistance / 1000).toFixed(2)}{" "}
            kilometres
          </span>
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="h-full">Data was not found with ID: {id}</div>
      )}
    </Fragment>
  );
};

export default Journey;
