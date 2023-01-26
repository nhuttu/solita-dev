import { Fragment } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchJourneyById } from "../../services/journey.service";
import { IJourney } from "../../utils/types";

const Journey = () => {
  const { id } = useParams();

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

  return (
    <Fragment>
      {data ? (
        <div className="flex h-full flex-col items-center gap-6 ">
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
