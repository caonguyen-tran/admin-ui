const AlertBox = ({ isSuccess, messageSuccess, messageError }) => {
  return (
    <div className="fixed top-4 right-4 z-50">
      <div
        className={`bg-white rounded-lg shadow-lg p-4 border-l-4 ${
          isSuccess ? "border-green-500" : "border-red-500"
        }`}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className={`h-5 w-5 ${
                isSuccess ? "text-green-500" : "text-red-500"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {isSuccess ? messageSuccess : messageError}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
