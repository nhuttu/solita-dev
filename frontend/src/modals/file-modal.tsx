import { AxiosError } from "axios";
import React, { ChangeEvent, Dispatch, useState } from "react";
import { SetStateAction } from "react";
import {
  uploadJourneyCSVFile,
  uploadStationCSVFile,
} from "../services/file.service";
import Alert from "../views/alert";

interface FileModalProps {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const FileModal: React.FC<FileModalProps> = ({ setModalOpen }) => {
  const [file, setFile] = useState<File>();
  const [fileType, setFileType] = useState<"journey" | "station">();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>({ message: "", type: "success" });

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
        setNotification({
          type: "success",
          message: "CSV file successfully uploaded!",
        });
        setTimeout(() => setNotification(null), 3000);
        setFile(undefined);
      } catch (e) {
        let error = e as AxiosError;
        setNotification({
          type: "error",
          message:
            (error.response?.data as string) ??
            "Something went wrong with the upload",
        });
      }
    }
    setIsSending(false);
  };

  return (
    <div
      className=" fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      {notification && <Alert notification={notification} />}
      <div className=" z-50 flex flex-col items-center justify-center gap-5 rounded-lg bg-white p-6 ">
        {isSending ? (
          "File is being uploaded, please wait."
        ) : (
          <>
            <button onClick={() => setModalOpen(false)}>
              <img src="close-icon.svg" alt="Close-Icon" className=" w-5" />
            </button>
            <div className="flex gap-6">
              <label htmlFor="journey-select" className="flex gap-2">
                Journey
                <input
                  id="journey-select"
                  type="checkbox"
                  checked={fileType === "journey"}
                  onChange={() => handleCheckboxChange("journey")}
                />
              </label>
              <label htmlFor="station-select" className=" flex gap-2">
                <input
                  id="station-select"
                  type="checkbox"
                  checked={fileType === "station"}
                  onChange={() => handleCheckboxChange("station")}
                />
                Station
              </label>
            </div>
            <label htmlFor="csv-modal-download"></label>
            <input
              id="csv-modal-download"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
            />
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
