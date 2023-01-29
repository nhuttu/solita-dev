import React, { useEffect, useState } from "react";

interface AlertProps {
  notification: {
    message: string;
    type: "error" | "success";
  };
}

/**
 * Alert is a component that renders a notification on the bottom right of the screen
 *
 * @param props A notification object that includes a message and a type (error/success)
 *
 * @returns {JSX.Element} Returns a JSX.Element
 */
const Alert: React.FC<AlertProps> = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const { message, type } = props.notification;

  useEffect(() => {
    setIsVisible(message !== "");
    if (message !== "") {
      setTimeout(() => setIsVisible(false), 6500);
    }
  }, [message]);

  const colorClass = () => {
    if (type === "error") return "bg-red-500";
    if (type === "success") return "bg-green-500";
  };
  return (
    <div
      className={`${
        isVisible ? "block" : "hidden"
      } fixed bottom-0 right-0 m-4 rounded-lg p-4 text-white ${colorClass()}`}
    >
      {message}
    </div>
  );
};

export default Alert;
