
import { Link, } from "react-router-dom";

function Sidebar() {
  return (
    <div className="min-w-64 h-screen bg-gray-800 text-white pt-6">
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
          <Link to={"/quiz-page"}>Quiz</Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
