import axios from "axios";
import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { fetchJourneys } from "../../services/journey.service";
import { IJourney } from "../../utils/types";
import JourneyRow from "./journey-row";
import JourneyTable from "./journey-table";

const Journeys = () => {
  const [page, setPage] = useState(0);
  const [journeys, setJourneys] = useState<IJourney[]>([]);

  const journeyQueryFn = async ({ pageParam = 0 }) => {
    try {
      const response = await fetchJourneys(pageParam);

      setJourneys(response);
      return response;
    } catch (e) {
      console.log(e, "Something went wrong with the fetch");
    }
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
    queryFn: journeyQueryFn,
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
      <JourneyTable journeys={journeys} />
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
export default Journeys;
