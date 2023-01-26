import React, { Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createJourney } from "../../services/journey.service";
import { fetchStations } from "../../services/station.service";
import { validateNewJourney } from "../../utils/helpers";
import { IJourney, INewJourney } from "../../utils/types";
import Alert from "../alert";

const NewJourney = () => {
  const [journey, setJourney] = useState<INewJourney>({
    return: "",
    departure: "",
    departureStationID: 1,
    returnStationID: 1,
    duration: 10,
    coveredDistance: 10,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>({ message: "", type: "success" });

  const { mutate } = useMutation({ mutationFn: createJourney });

  const { data: stationData } = useQuery("stations", fetchStations);

  const handleJourneyKeyChange = (event: any, key: keyof IJourney) => {
    console.log(event.target.value);
    setJourney({ ...journey, [key]: event.target.value });
  };

  console.log(journey);

  const handleSubmit = () => {
    try {
      mutate(journey, {
        onSuccess: () => {
          setNotification({
            message: "Journey succesfully created!",
            type: "success",
          });
          setTimeout(() => setNotification(null), 3000);
        },
        onError: () => {
          setNotification({
            message: "Error with the creation!",
            type: "error",
          });
          setTimeout(() => setNotification(null), 3000);
        },
      });
    } catch (e) {}
  };

  useEffect(() => {
    if (validateNewJourney(journey)) setIsButtonDisabled(false);
  }, [journey]);

  return (
    <Fragment>
      {notification && <Alert notification={notification} />}
      <div className="flex h-full items-center justify-center">
        <div className="flex flex-col gap-5">
          <>
            When did you departure? (year-day-month-T-hour-minute-second)
            <input
              type="text"
              value={journey.departure}
              className=" rounded border border-black "
              onChange={(e) => handleJourneyKeyChange(e, "departure")}
            />
          </>
          <>
            When did you return? (year-day-month-T-hour-minute-second)
            <input
              type="text"
              value={journey.return}
              className="rounded border border-black "
              onChange={(e) => handleJourneyKeyChange(e, "return")}
            />
          </>
          What was your departure station?
          <select
            onChange={(e) => handleJourneyKeyChange(e, "departureStation")}
            className="border border-black"
          >
            {stationData?.map((station) => (
              <option value={Number(station.stationID)} key={station.id}>
                {station.nameFI}
              </option>
            ))}
          </select>
          What was your return station?
          <select
            onChange={(e) => handleJourneyKeyChange(e, "returnStation")}
            className="border border-black"
          >
            {stationData?.map((station) => (
              <option value={Number(station.stationID)} key={station.id}>
                {station.nameFI}
              </option>
            ))}
          </select>
          How long was the duration (s)? (min 10)
          <input
            type="number"
            className="rounded border border-black "
            onChange={(e) => handleJourneyKeyChange(e, "duration")}
            value={journey.duration}
          />
          How long was the covered distance (m)? (min 10)
          <input
            value={journey.coveredDistance}
            type="number"
            className="rounded border border-black "
            onChange={(e) => handleJourneyKeyChange(e, "coveredDistance")}
          />
          <button
            disabled={isButtonDisabled}
            className={"rounder border border-black"}
            onClick={handleSubmit}
          >
            <span className={isButtonDisabled ? "opacity-50" : ""}>
              Save journey
            </span>
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default NewJourney;
