import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

import Login from "./pages/sign/Login";

import UserPage from "./pages/pages/UserPage";
import CollectionPage from "./pages/pages/CollectionPage";
import WordPage from "./pages/pages/WordPage";
import LearnedPage from "./pages/pages/LearnedPage";
import DownloadPage from "./pages/pages/DownloadPage";

import QuestionSet from "./pages/pages/QuestionSet";
import Question from "./pages/pages/Question";
import CreateQuestion from "./pages/pages/CreateQuestion";

import Sidebar from "./components/SideBar";
import RequireAuth from "./hooks/RequireAuth";

const routes = [
  {
    path: "/user-page",
    element: <UserPage />,
    label: "Users",
  },
  {
    path: "/collection-page",
    element: <CollectionPage />,
    label: "Collections",
  },
  {
    path: "/download-page",
    element: <DownloadPage />,
    label: "Downloads",
  },
  {
    path: "/word-page",
    element: <WordPage />,
    label: "Words",
  },
  {
    path: "/learned-page",
    element: <LearnedPage />,
    label: "Learned",
  },
];

const quizRoutes = [
  {
    path: "/question-set-page",
    element: <QuestionSet />,
    label: "Question Sets",
  },
  {
    path: "/question-page",
    element: <Question />,
    label: "Questions",
  },
  {
    path: "/answer-page",
    element: <QuestionSet />,
    label: "Answers",
  },
];

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Main Routes */}
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RequireAuth>
                  <div className="flex min-h-screen bg-gray-100">
                    <Sidebar />
                    <main className="flex-1 p-8 ml-64">{route.element}</main>
                  </div>
                </RequireAuth>
              }
            />
          ))}

          {/* Quiz Routes */}
          {quizRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <RequireAuth>
                  <div className="flex min-h-screen bg-gray-100">
                    <Sidebar />
                    <main className="flex-1 p-8 ml-64">{route.element}</main>
                  </div>
                </RequireAuth>
              }
            />
          ))}

          {/* Special Routes */}
          <Route
            path="/question-set-page/create-question/:questionSetId"
            element={
              <RequireAuth>
                <div className="flex min-h-screen bg-gray-100">
                  <Sidebar />
                  <main className="flex-1 p-8 ml-64">
                    <CreateQuestion />
                  </main>
                </div>
              </RequireAuth>
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <div className="flex min-h-screen bg-gray-100">
                <Sidebar />
                <main className="flex-1 p-8 ml-64">
                  <div className="flex items-center justify-center h-full">
                    <h1 className="text-2xl font-bold text-gray-800">
                      404 - Page Not Found
                    </h1>
                  </div>
                </main>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
