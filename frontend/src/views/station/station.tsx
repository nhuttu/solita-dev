import { Fragment } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchStationById } from "../../services/station.service";
import { IStation } from "../../utils/types";

const Station = () => {
  const { id } = useParams();

  const fetchStation = async (): Promise<IStation | undefined> => {
    if (id) {
      try {
        const res = await fetchStationById(id);
        return res;
      } catch (e) {
        console.log(e, "Something went wrong with the fetch");
      }
    }
  };

  const { data, status, error } = useQuery<IStation | undefined, Error>(
    "station",
    fetchStation
  );

  return (
    <Fragment>
      {data ? (
        <div className=" flex h-full flex-col items-center gap-6 ">
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
          <div className=" flex gap-5 text-2xl ">
            <div className="flex-1 ">
              Top 5 departure stations:
              {data.popularDepartures?.map((station) => {
                return (
                  <div key={station.id} className=" text-base ">
                    {station.nameFI} / {station.nameSV}
                  </div>
                );
              })}
            </div>
            <div>
              Top 5 return stations:
              {data.popularReturns?.map((station) => {
                return (
                  <div key={station.id} className="text-base">
                    {station.nameFI} / {station.nameSV}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="h-full">Data was not found with ID: {id}</div>
      )}
    </Fragment>
  );
};
export default Station;
