import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { fetchStationById } from "../../services/station.service";
import { IJourney } from "../../utils/types";

const Station = () => {
  const { id } = useParams();
  const [journey, setJourney] = useState<IJourney>();

  const fetchStation = async () => {
    if (id) {
      try {
        const res = await fetchStationById(id);
        setJourney(res);
      } catch (e) {
        console.log(e, "Something went wrong with the fetch");
      }
    }
  };

  const { data, status, error } = useQuery({
    queryFn: fetchStation,
  });

  return (
    <div className="min-h-full">
      Hello from station
      <p>{id}</p>
    </div>
  );
};
export default Station;
