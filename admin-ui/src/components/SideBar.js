import { useState } from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpenQuiz, setIsOpenQuiz] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleOpenQuiz = () => {
    setIsOpenQuiz(!isOpenQuiz);
  };

  return isSidebarOpen ? (
    <div className="min-w-24 mt-10">
      <button
        className="w-28 h-10 bg-gray-500 rounded-md mb-3"
        onClick={toggleSidebar}
      >
        Hiện
      </button>
    </div>
  ) : (
    <div className="min-w-64 h-screen bg-gray-800 text-white pt-6">
      <button
        className="w-28 h-10 bg-gray-500 rounded-md mb-3"
        onClick={toggleSidebar}
      >
        Ẩn
      </button>
      <ul className="space-y-2">
        <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
          <Link to={"/user-page"}>User</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
          <Link to={"/collection-page"}>Collection Vocabulary</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
          <Link to={"/download-page"}>Downloaded</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
          <Link to={"/word-page"}>Word</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
          <Link to={"/learned-page"}>Word Learned</Link>
        </li>
        <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
          <button onClick={toggleOpenQuiz}>Quiz</button>
        </li>
        {isOpenQuiz ? (
          <div></div>
        ) : (
          <div className="bg-slate-400 h-auto w-full">
            <ul className="space-y-2 ml-6">
              <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
                <Link to={"/question-set-page"}>Question Set</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
                <Link to={"/question-page"}>Question</Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-600 ease-linear transition-all">
                <Link to={"/answer-page"}>Answer</Link>
              </li>
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
