import { MouseEvent, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { createStation } from "../../services/station.service";
import { validateNewStation } from "../../utils/helpers";
import { IStationEntry } from "../../utils/types";
import Alert from "../alert";

/**
 * NewStation is a component for creating a new station
 *
 * @returns {JSX.Element}
 */
const NewStation = () => {
  const [station, setStation] = useState<IStationEntry>({
    nameFI: "",
    nameSV: "",
    nameEN: "",
    addressFI: "",
    addressSV: "",
    cityFI: "",
    citySV: "",
    operator: "",
    capacity: 0,
    coordinateX: 0,
    coordinateY: 0,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>({ message: "", type: "success" });

  const { mutate } = useMutation({ mutationFn: createStation });

  const handleStationKeyChange = (e: any, key: keyof IStationEntry) => {
    setStation({ ...station, [key]: e.target.value });
  };

  console.log(station);

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    try {
      mutate(station, {
        onSuccess: () => {
          setNotification({
            type: "success",
            message: "Station successfully created!",
          });
          setTimeout(() => setNotification(null), 3000);
        },
        onError: () => {
          setNotification({
            type: "error",
            message: "An error occurred with the creation!",
          });
          setTimeout(() => setNotification(null), 3000);
        },
      });
    } catch (e) {}
  };

  useEffect(() => {
    if (validateNewStation(station)) setIsButtonDisabled(false);
  }, [station]);

  return (
    <div className="flex min-h-full justify-center">
      {notification && <Alert notification={notification} />}
      <div className="gap mb-2 flex flex-col gap-2">
        <>
          <label htmlFor="nameFI">Name (FI)</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "nameFI")}
            id="nameFI"
            className="border-2 border-black "
            type="text"
          />
          <label htmlFor="nameFI">Name (SV)</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "nameSV")}
            id="nameSV"
            className="border-2 border-black "
            type="text"
          />
          <label htmlFor="addressEN">Name (EN)</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "nameEN")}
            id="nameEN"
            className="border-2 border-black "
            type="text"
          />
          <label htmlFor="addressFI">Address (FI)</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "addressFI")}
            id="addressFI"
            className="border-2 border-black"
            type="text"
          />
          <label htmlFor="addressSV">Address (SV)</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "addressSV")}
            id="addressSV"
            className="border-2 border-black"
            type="text"
          />
          <label htmlFor="cityFI">City (FI)</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "cityFI")}
            id="cityFI"
            className="border-2 border-black"
            type="text"
          />
          <label htmlFor="citySV">City (SV)</label>
          <input
            id="citySV"
            onChange={(e) => handleStationKeyChange(e, "citySV")}
            type="text"
            className="border-2 border-black"
          />
          <label htmlFor="operator">Operator</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "operator")}
            id="operator"
            type="text"
            className="border-2 border-black"
          />
          <label htmlFor="capacity">Capacity</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "capacity")}
            id="capacity"
            type="number"
            className="border-2 border-black"
          />
          <label htmlFor="coordinateX">X-coordinate</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "coordinateX")}
            id="coordinateX"
            type="number"
            className="border-2 border-black"
          />
          <label htmlFor="coordinateY">Y-coordinate</label>
          <input
            onChange={(e) => handleStationKeyChange(e, "coordinateY")}
            id="coordinateY"
            type="number"
            className="border-2 border-black"
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
        </>
      </div>
    </div>
  );
};

export default NewStation;
