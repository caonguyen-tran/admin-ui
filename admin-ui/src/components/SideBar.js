import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ChevronLeft, 
  ChevronRight,
  Users,
  BookOpen,
  Download,
  Book,
  GraduationCap,
  HelpCircle,
  FileText,
  MessageSquare,
  CheckCircle
} from 'lucide-react';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isQuizExpanded, setIsQuizExpanded] = useState(false);
  const location = useLocation();

  // Emit sidebar state changes
  useEffect(() => {
    const event = new CustomEvent('sidebarStateChange', {
      detail: isCollapsed
    });
    window.dispatchEvent(event);
  }, [isCollapsed]);

  const navigationItems = [
    { path: "/user-page", label: "Users", icon: <Users size={20} /> },
    { path: "/collection-page", label: "Collections", icon: <BookOpen size={20} /> },
    { path: "/download-page", label: "Downloads", icon: <Download size={20} /> },
    { path: "/word-page", label: "Words", icon: <Book size={20} /> },
    { path: "/learned-page", label: "Learned", icon: <GraduationCap size={20} /> },
  ];

  const quizItems = [
    { path: "/question-set-page", label: "Question Sets", icon: <FileText size={20} /> },
    { path: "/question-page", label: "Questions", icon: <HelpCircle size={20} /> },
    { path: "/answer-page", label: "Answers", icon: <MessageSquare size={20} /> },
  ];

  const isActive = (path) => location.pathname === path;

  const handleQuizToggle = () => {
    setIsQuizExpanded(prev => !prev);
  };

  const handleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <div 
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-gray-100 transition-all duration-300 ease-in-out z-50 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          )}
          <button
            onClick={handleCollapse}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  {item.icon}
                  {!isCollapsed && (
                    <span className="ml-3">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}

            {/* Quiz Section */}
            <li className="relative">
              <button
                onClick={handleQuizToggle}
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors hover:bg-gray-800 ${
                  isQuizExpanded ? 'bg-gray-800' : ''
                }`}
              >
                <HelpCircle size={20} />
                {!isCollapsed && (
                  <>
                    <span className="ml-3">Quiz</span>
                    <ChevronRight
                      size={20}
                      className={`ml-auto transition-transform duration-200 ${
                        isQuizExpanded ? 'rotate-90' : ''
                      }`}
                    />
                  </>
                )}
              </button>
              
              {!isCollapsed && (
                <div 
                  className={`overflow-hidden transition-all duration-200 ease-in-out ${
                    isQuizExpanded ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <ul className="mt-1 ml-4 space-y-1">
                    {quizItems.map((item) => (
                      <li key={item.path}>
                        <Link
                          to={item.path}
                          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                            isActive(item.path)
                              ? 'bg-blue-600 text-white'
                              : 'hover:bg-gray-800'
                          }`}
                        >
                          {item.icon}
                          <span className="ml-3">{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <CheckCircle size={16} />
              <span>System Status: Online</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
