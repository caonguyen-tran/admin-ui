import { useEffect, useState } from "react";
import Header from "../../components/Header";
import UserTable from "../../components/UserTable";
import { adminEndpoints, authApi } from "../../APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import TableLoading from "../../common/TableLoading";
import { AlertCircle } from 'lucide-react';

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { current } = useAuth();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const res = await authApi(current.user.token).get(
          adminEndpoints["admin-get-user"]
        );
        
        setList(res.data.data);
      } catch (ex) {
        console.error("Error fetching users:", ex);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [current.user.token]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className={`py-6 px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out `}>
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

        <div className="w-full mx-auto">
          {loading ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <TableLoading />
            </div>
          ) : (
            <UserTable users={list} />
          )}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
