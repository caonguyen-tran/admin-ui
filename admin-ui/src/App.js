import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import "./App.css";

// Auth Pages
import Login from "./pages/sign/Login";

// Main Pages
import UserPage from "./pages/pages/UserPage";
import CollectionPage from "./pages/pages/CollectionPage";
import WordPage from "./pages/pages/WordPage";
import LearnedPage from "./pages/pages/LearnedPage";
import DownloadPage from "./pages/pages/DownloadPage";

// Quiz Pages
import QuestionSet from "./pages/pages/QuestionSet";
import Question from "./pages/pages/Question";
import CreateQuestion from "./pages/pages/CreateQuestion";

// Layout Components
import Sidebar from "./components/SideBar";
import { useEffect } from "react";

// Route Configuration
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

const ProtectedRoute = ({ children }) => {
  const { current, dispatch } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const storedAuth = localStorage.getItem('authData');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        dispatch({
          type: "LOGIN",
          payload: authData
        });
      }
    };

    checkAuth();
  }, [dispatch]);

  // Handle redirection based on auth state and current path
  useEffect(() => {
    const storedAuth = localStorage.getItem('authData');
    const isAuthenticated = storedAuth || current;

    if (isAuthenticated && location.pathname === '/login') {
      navigate('/user-page', { replace: true });
    } else if (!isAuthenticated && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [current, location.pathname, navigate]);

  // For protected routes, show the layout with sidebar
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Main Routes */}
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}

          {/* Protected Quiz Routes */}
          {quizRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <ProtectedRoute>
                  {route.element}
                </ProtectedRoute>
              }
            />
          ))}

          {/* Special Routes */}
          <Route
            path="/create-question/:questionSetId"
            element={
              <ProtectedRoute>
                <CreateQuestion />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <div className="flex items-center justify-center h-full">
                  <h1 className="text-2xl font-bold text-gray-800">404 - Page Not Found</h1>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
