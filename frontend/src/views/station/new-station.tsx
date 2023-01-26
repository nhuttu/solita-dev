import React, { useState } from "react";
import { useMutation } from "react-query";
import { createStation } from "../../services/station.service";
import { IStation, IStationEntry } from "../../utils/types";

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

  const { mutate } = useMutation({ mutationFn: createStation });

  return (
    <div className="h-full">
      <div>
        <label htmlFor="addressFI">Name (FI)</label>
        <input id="addressFI" className="border-2 border-black " />
      </div>
    </div>
  );
};

export default NewStation;
