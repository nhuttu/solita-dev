import { AxiosError } from "axios";
import React, { ChangeEvent, Dispatch, useState } from "react";
import { SetStateAction } from "react";
import {
  uploadJourneyCSVFile,
  uploadStationCSVFile,
} from "../services/file.service";

interface FileModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const FileModal: React.FC<FileModalProps> = ({ setModalOpen }) => {
  const [file, setFile] = useState<File>();
  const [fileType, setFileType] = useState<"journey" | "station">();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [notification, setNotification] = useState<string>();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files);
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleCheckboxChange = (target: string) => {
    if (target === "station" || target === "journey") {
      setFileType(target);
    }
  };

  const handleFileSend = async () => {
    if (file) {
      setIsSending(true);
      try {
        if (fileType === "journey") {
          await uploadJourneyCSVFile(file);
        } else {
          await uploadStationCSVFile(file);
        }
      } catch (e) {
        let error = e as AxiosError;
        console.log(error.response?.data);
      }
    }
    setIsSending(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-gray-900 opacity-50 ">
      <div className=" z-50 flex flex-col items-center justify-center gap-5 rounded-lg bg-white p-6 shadow-lg">
        {isSending ? (
          "File is being uploaded, please wait."
        ) : (
          <>
            <button onClick={() => setModalOpen(false)}>
              <img src="close-icon.svg" alt="Close-Icon" className=" w-5" />
            </button>
            <div className="flex gap-6">
              <label htmlFor="journey-select">
                Journey
                <input
                  id="journey-select"
                  type="checkbox"
                  checked={fileType === "journey"}
                  onChange={() => handleCheckboxChange("journey")}
                />
              </label>
              <label htmlFor="station-select" className=" gap-6">
                <input
                  checked={fileType === "station"}
                  id="station-select"
                  type="checkbox"
                  onChange={() => handleCheckboxChange("station")}
                />
                Station
              </label>
            </div>
            <label htmlFor="csv-modal-download">
              <input
                id="csv-modal-download"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
              />
            </label>
            {file && fileType && (
              <button onClick={() => handleFileSend()}>Send file</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FileModal;
