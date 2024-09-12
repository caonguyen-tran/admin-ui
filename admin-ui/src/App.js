import "./App.css";
import Login from "./pages/sign/Login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import UserPage from "./pages/pages/UserPage";
import CollectionPage from "./pages/pages/CollectionPage";
import WordPage from "./pages/pages/WordPage";
import LearnedPage from "./pages/pages/LearnedPage";
import QuizPage from "./pages/pages/QuizPage";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import DownloadPage from "./pages/pages/DownloadPage";

const ProtectedRoute = ({ children }) => {
  const { current } = useAuth();
  const navigate = useNavigate();

  if (!current) {
    return (<Login />)
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-lvh">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/user-page"
              element={
                <ProtectedRoute>
                  <UserPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/collection-page"
              element={
                <ProtectedRoute>
                  <CollectionPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/download-page"
              element={
                <ProtectedRoute>
                  <DownloadPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/word-page"
              element={
                <ProtectedRoute>
                  <WordPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/learned-page"
              element={
                <ProtectedRoute>
                  <LearnedPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/quiz-page"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
