import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { adminEndpoints, authApi } from "../../APIs/APIs";
import Header from "../../components/Header";
import TableLoading from "../../common/TableLoading";
import QuestionSetTable from "../../components/QuestionSetTable";
import { AlertCircle } from 'lucide-react';

const QuestionSet = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { current } = useAuth();

  const fetchData = async () => {
    try {
      let res = await authApi(current.user.token).get(
        adminEndpoints["admin-get-question-set"]
      );
      setList(res.data.data);
      setError(null);
    } catch (ex) {
      console.error("Error fetching question sets:", ex);
      setError("Failed to load question sets. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);

    fetchData();
  }, [current.user.token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className={`py-6 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out`}>
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-screen-2xl mx-auto">
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <TableLoading />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm">
              <QuestionSetTable questionSets={list} onQuestionSetUpdate={fetchData} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuestionSet;
