import React, { ChangeEvent, Fragment, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createJourney } from "../../services/journey.service";
import { fetchStations } from "../../services/station.service";
import { validateNewJourney } from "../../utils/helpers";
import { IJourney, IJourneyEntry } from "../../utils/types";
import Alert from "../alert";

/**
 * NewJourney is a component for creating a new journey
 *
 * @returns {JSX.Element} Returns a JSX.element
 */
const NewJourney = (): JSX.Element => {
  const [journey, setJourney] = useState<IJourneyEntry>({
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

  const handleJourneyKeyChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: keyof IJourney
  ) => {
    console.log(event.target.value);
    setJourney({ ...journey, [key]: event.target.value });
  };

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
            <label htmlFor="departure-input">
              When did you departure? (year-day-month-T-hour-minute-second)
            </label>
            <input
              id="departure-input"
              type="text"
              value={journey.departure}
              className=" rounded border border-black "
              onChange={(e) => handleJourneyKeyChange(e, "departure")}
            />
          </>
          <>
            <label htmlFor="return-input">
              When did you return? (year-day-month-T-hour-minute-second)
            </label>
            <input
              type="text"
              id="return-input"
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
              <option value={Number(station.id)} key={station.id}>
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
              <option value={Number(station.id)} key={station.id}>
                {station.nameFI}
              </option>
            ))}
          </select>
          <label htmlFor="duration-input">
            How long was the duration (s)? (min 10)
          </label>
          <input
            type="number"
            id="duration-input"
            className="rounded border border-black "
            onChange={(e) => handleJourneyKeyChange(e, "duration")}
            value={journey.duration}
          />
          <label htmlFor="covered-distance-input">
            How long was the covered distance (m)? (min 10)
          </label>
          <input
            value={journey.coveredDistance}
            type="number"
            id="covered-distance-input"
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
