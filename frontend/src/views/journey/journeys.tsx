import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import FileModal from "../../modals/file-modal";
import { fetch50Journeys } from "../../services/journey.service";
import { IJourney } from "../../utils/types";
import JourneyTable from "./journey-table";

const Journeys = () => {
  const [page, setPage] = useState(0);
  const [journeys, setJourneys] = useState<IJourney[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const journeyQueryFn = async ({ pageParam = 0 }) => {
    try {
      const response = await fetch50Journeys(pageParam);

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
  } = useInfiniteQuery<IJourney[], Error>({
    queryKey: ["journeys"],
    queryFn: journeyQueryFn,
    getNextPageParam: (currentPage) => {
      return currentPage && currentPage.length === 50 && page + 1;
    },
    getPreviousPageParam: () => {
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
    <div className="flex min-h-full flex-col items-center gap-5">
      <div className="flex items-center justify-center gap-4">
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : null}

        <button
          className="flex h-max w-20 items-center justify-center rounded border-2 border-black"
          onClick={() => handlePreviousPageClick()}
          disabled={!hasPreviousPage || isFetchingNextPage}
        >
          {hasNextPage ? <img src="arrow-left.svg" /> : "Nothing to load"}
        </button>

        <button
          className="flex h-max w-20 items-center justify-center rounded border-2 border-black"
          onClick={() => handleNextPageClick()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage ? <img src="arrow-right.svg" /> : "Nothing to load"}
        </button>
      </div>
      {journeys.length !== 0 && status === "success" ? (
        <JourneyTable journeys={journeys} />
      ) : (
        <button
          className="gap-3 rounded border-2 border-black"
          onClick={() => setModalOpen(true)}
        >
          Download a CSV file
        </button>
      )}

      {modalOpen && <FileModal setModalOpen={setModalOpen} />}

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};
export default Journeys;
