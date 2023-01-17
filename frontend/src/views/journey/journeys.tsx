import axios from "axios";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { IJourney } from "../../utils/types";
import JourneyRow from "./journey-row";

const Journeys = () => {
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState<IJourney[]>([]);

  const fetchJourneys = async ({ pageParam = 0 }) => {
    const response = await axios.get(
      `http://localhost:3000/journeys?page=${pageParam}`
    );
    setPages(response.data);
    return response.data;
  };

  const {
    fetchNextPage,
    error,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery<IJourney[], Error>({
    queryKey: ["journeys"],
    queryFn: fetchJourneys,
    getNextPageParam: (currentPage) => {
      return currentPage.length === 50 && page + 1;
    },
  });

  const handleNextPageClick = () => {
    setPage((prev) => prev + 1);
    fetchNextPage();
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
      </div>
      <table className="flex flex-col">
        <tr>
          <th>Departure</th>
          <th>Return</th>
          <th>Departure station ID</th>
          <th>Return station ID</th>
          <th>Covered distance</th>
          <th>Duration</th>
        </tr>
        {pages.map((i) => (
          <JourneyRow {...i} key={i.id} />
        ))}
      </table>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
export default Journeys;
