import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { adminEndpoints, authApi } from "../../APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import TableLoading from "../../common/TableLoading";
import DownloadTable from "../../components/DownloadTable";
import { AlertCircle } from 'lucide-react';

const DownloadPage = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { current } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let res = await authApi(current.user.token).get(
          adminEndpoints["admin-get-download"]
        );
        setList(res.data.data);
        setError(null);
      } catch (ex) {
        console.error("Error fetching downloads:", ex);
        setError("Failed to load downloads. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

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
              <DownloadTable downloads={list} />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DownloadPage;