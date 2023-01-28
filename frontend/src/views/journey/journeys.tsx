import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import FileModal from "../../modals/file-modal";
import { fetch50Journeys } from "../../services/journey.service";
import { IJourney } from "../../utils/types";
import JourneyTable from "./journey-table";

let timeout: any;

const Journeys = () => {
  const [page, setPage] = useState(0);
  const [journeys, setJourneys] = useState<IJourney[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filterWords, setFilterWords] = useState({ return: "", departure: "" });

  const journeyQueryFn = async (
    pageParam = page
  ): Promise<IJourney[] | undefined> => {
    try {
      const response = await fetch50Journeys(pageParam, filterWords);

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
    isFetchingPreviousPage,
    fetchPreviousPage,
    refetch,
  } = useInfiniteQuery<IJourney[] | undefined, Error>({
    queryKey: ["journeys"],
    queryFn: (page) => journeyQueryFn(page.pageParam),
    getNextPageParam: () => {
      return journeys.length === 50 ? page + 1 : undefined;
    },
    getPreviousPageParam: () => {
      return page - 1 >= 0 ? page - 1 : false;
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

  useEffect(() => {
    refetch();
  }, [filterWords, refetch]);

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof { return: string; departure: string }
  ) => {
    // Debounce
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setFilterWords({ ...filterWords, [key]: e.target.value });
    }, 1000);
  };

  return (
    <div className="flex min-h-full flex-col items-center gap-5">
      <div className="flex items-center justify-center gap-4">
        <label id="return-filter">Return station name filter</label>

        <input
          className="rounded border-2 border-black"
          id="return-filter"
          onChange={(e) => handleFilterChange(e, "return")}
          defaultValue={filterWords.return}
          type="text"
        />
        {status === "loading" ? (
          <p>Loading...</p>
        ) : status === "error" ? (
          <span>Error: {error.message}</span>
        ) : null}
        <button
          className="flex h-max w-20 items-center justify-center rounded border-2 border-black"
          onClick={() => handlePreviousPageClick()}
          disabled={!hasPreviousPage || isFetchingPreviousPage}
        >
          {hasPreviousPage ? (
            <img src="arrow-left.svg" alt="Arrow left" />
          ) : (
            "No page"
          )}
        </button>
        <button
          className="flex h-max w-20 items-center justify-center rounded border-2 border-black"
          onClick={() => handleNextPageClick()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {hasNextPage ? (
            <img src="arrow-right.svg" alt="Arrow Right" />
          ) : (
            "No page"
          )}
        </button>
        <input
          className="rounded border-2 border-black"
          id="departure-filter"
          onChange={(e) => handleFilterChange(e, "departure")}
          defaultValue={filterWords.departure}
          type="text"
        />
        <label htmlFor="departure-filter">Departure station name filter</label>
        <button className="w-max rounded border-2 border-black">
          <Link to="/journey">Create a journey</Link>
        </button>
      </div>
      {journeys.length > 0 && status === "success" ? (
        <JourneyTable journeys={journeys} />
      ) : (
        <button
          className="gap-3 rounded border-2 border-black"
          onClick={() => setModalOpen(true)}
        >
          Download a CSV file
        </button>
      )}
      {journeys.length === 0 &&
        status === "success" &&
        filterWords.departure &&
        filterWords.return && <div>No journeys found with the filter!</div>}

      {modalOpen && <FileModal setModalOpen={setModalOpen} />}

      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </div>
  );
};
export default Journeys;
