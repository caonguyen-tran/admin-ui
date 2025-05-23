import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LogOut, User } from 'lucide-react';

const Header = () => {
    const { current, dispatch } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        // Remove token from localStorage
        localStorage.removeItem('authData');
        
        // Update auth context
        dispatch({
            type: "LOGOUT"
        });
        
        // Redirect to login
        navigate("/login");
    };

    return (
        <div className="bg-white shadow-sm">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
                    
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">{current?.user?.role}</p>
                            <p className="text-xs text-gray-500">{current?.user?.username}</p>
                        </div>
                        
                        <button 
                            onClick={logout}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                            <LogOut size={16} className="mr-2" />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;