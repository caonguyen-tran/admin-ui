import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import UserTable from "../../components/UserTable";
import { adminEndpoints, authApi } from "../../APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import TableLoading from "../../common/TableLoading";

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const { current } = useAuth();

  const [list, setList] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let res = await authApi(current.user.token).get(
          adminEndpoints["admin-get-user"]
        );
        setList(res.data.data);
        setLoading(false)
      } catch (ex) {
        console.log(ex);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-lvh bg-red-50">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <Header />
        {loading ? <TableLoading /> : <UserTable users={list} />}
      </div>
    </div>
  );
};

export default UserPage;
