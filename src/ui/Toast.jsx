import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hide } from "../utils/toastSlice";

function Toast() {
  const toasts = useSelector((state) => state.toast.toasts);
  const dispatch = useDispatch();

  return (
    <div className="fixed right-5 top-20 z-50 space-y-2">
      {toasts.map(({ id, message, duration, isError }) => (
        <SingleToast
          key={id}
          message={message}
          duration={duration}
          isError={isError}
          onClose={() => dispatch(hide(id))}
        />
      ))}
    </div>
  );
}

function SingleToast({ message, duration, onClose, isError }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const hideTimeout = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, duration);

    return () => clearTimeout(hideTimeout);
  }, [duration, onClose]);

  return (
    <div
      className={`flex items-start justify-between gap-4 rounded ${isError ? "bg-red-500" : "bg-green-500"} px-4 py-2 text-white shadow-lg transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
      }`}
    >
      <span>{message}</span>
      <button
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        className="ml-4 font-bold text-white hover:text-gray-200"
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default Toast;
