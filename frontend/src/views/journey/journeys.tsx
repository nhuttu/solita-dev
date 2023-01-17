import axios from "axios";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { IJourney } from "../../utils/types";
import JourneyRow from "./journey-row";

const Journeys = () => {
  const [page, setPage] = useState(0);
  const [journeys, setJourneys] = useState<IJourney[]>([]);

  const fetchJourneys = async ({ pageParam = 0 }) => {
    const response = await axios.get(
      `http://localhost:3000/journeys?page=${pageParam}`
    );
    setJourneys(response.data);
    return response.data;
  };

  const {
    fetchNextPage,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    hasPreviousPage,
    fetchPreviousPage,
    isPreviousData,
  } = useInfiniteQuery<IJourney[], Error>({
    queryKey: ["journeys"],
    queryFn: fetchJourneys,
    getNextPageParam: (currentPage) => {
      return currentPage.length === 50 && page + 1;
    },
    getPreviousPageParam: (currentPage) => {
      return page !== 0 ? page - 1 : undefined;
    },
  });

  const handleNextPageClick = () => {
    setPage((prev) => prev + 1);
    fetchNextPage();
  };

  const handlePreviousPageClick = () => {
    setPage((prev) => prev - 1);
    fetchPreviousPage();
  };

  return (
    <>
      <div>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : null}
        <button
          onClick={() => handleNextPageClick()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
        <button
          onClick={() => handlePreviousPageClick()}
          disabled={!hasPreviousPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load previous"
            : "Nothing more to load"}
        </button>
      </div>
      <table className="flex flex-col">
        <tbody>
          <tr>
            <th>Departure</th>
            <th>Return</th>
            <th>Departure station ID</th>
            <th>Return station ID</th>
            <th>Covered distance</th>
            <th>Duration</th>
          </tr>
          {journeys.map((i) => (
            <JourneyRow {...i} key={i.id} />
          ))}
        </tbody>
      </table>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
export default Journeys;
