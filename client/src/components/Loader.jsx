import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Loader = () => {
  const { navigate } = useAppContext();
  const { nextUrl } = useParams();

  useEffect(() => {
    if (nextUrl) {
      const timer = setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [nextUrl, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Spinner */}
      <div className="relative">
        <div className="h-24 w-24 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
        <span className="absolute inset-0 flex items-center justify-center text-indigo-700 font-semibold text-lg">
          StayAt
        </span>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-gray-700 text-lg font-medium animate-pulse">
        Redirecting you to the next page...
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 animate-[progress_8s_linear_forwards]"></div>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
