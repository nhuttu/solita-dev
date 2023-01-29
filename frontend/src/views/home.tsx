import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import FileModal from "../modals/file-modal";

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Fragment>
      {modalOpen && <FileModal setModalOpen={setModalOpen} />}
      <div className=" flex min-h-full flex-col items-center justify-center gap-6">
        <span>
          Welcome to Stations and Journeys! If you yet haven't uploaded any data
          (CSV), click below to upload your file!
        </span>
        <button
          onClick={() => setModalOpen(true)}
          className="w-24 rounded border  border-black"
        >
          Upload CSV file
        </button>
        Want to create a new journey?
        <button className="rounder w-28 border border-black">
          <Link to="/journey">Create new journey</Link>
        </button>
        Want to create a new station?
        <button className="rounder w-28 border border-black">
          <Link to="/station">Create new station</Link>
        </button>
      </div>
    </Fragment>
  );
};

export default Home;
