import { useEffect, useState } from "react";
import CollectionTable from "../../components/CollectionTable";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import { adminEndpoints, authApi } from "../../APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import TableLoading from "../../common/TableLoading";


const QuizPage = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const {current} = useAuth()

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        let res = await authApi(current.user.token).get(
          adminEndpoints["admin-get-collection"]
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
        {loading ? <TableLoading /> : <CollectionTable collections={list}/>}
      </div>
    </div>
  );
};

export default QuizPage;