import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
    const {current, dispatch} = useAuth()
    const navigate = useNavigate()


    const logout = () => {
        dispatch({
            type: "LOGOUT"
        })
        navigate("/login")
    }

    return (
        <div>
            <div className="bg-white shadow p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
            <div className="flex items-center">
                <div className="text-right mr-4">
                <p className="text-sm font-medium">{current.user.role}</p>
                <p className="text-xs text-gray-500">{current.user.username}</p>
                </div>
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => logout()}>
                Logout
                </button>
            </div>
            </div>
        </div>
    )
}

export default Header;