import { useState, useCallback } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import TableLoading from "../../common/TableLoading";
import { adminEndpoints, authApi } from "../../APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import QuestionTable from "../../components/QuestsionTable";
import { FiUpload, FiX } from "react-icons/fi";

const CreateQuestion = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const { current } = useAuth();
  const [list, setList] = useState([]);
  const { questionSetId } = useParams();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_FILE_TYPES = ['.xlsx', '.xls', '.csv'];

  const validateFile = (file) => {
    if (!file) return "Please select a file";
    if (file.size > MAX_FILE_SIZE) return "File size should be less than 5MB";
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_FILE_TYPES.includes(fileExtension)) {
      return "Please upload only Excel or CSV files";
    }
    return "";
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const error = validateFile(file);
    if (error) {
      setError(error);
      setSelectedFile(null);
      return;
    }
    setError("");
    setSelectedFile(file);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    const error = validateFile(file);
    if (error) {
      setError(error);
      return;
    }
    setError("");
    setSelectedFile(file);
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await authApi(current.user.token).post(
        adminEndpoints["admin-upload-file-create-questions"](questionSetId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setList(response.data.data);
    } catch (ex) {
      setError("Failed to upload file. Please try again.");
      console.error("Error uploading file:", ex);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-grow p-6">
        <Header />
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Upload Questions
            </h1>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <div className="space-y-4">
                  <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-gray-600">
                    <p className="font-medium">Drag and drop your file here</p>
                    <p className="text-sm mt-1">or</p>
                    <label className="mt-2 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                      <span>Browse Files</span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".xlsx,.xls,.csv"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">
                    Supported formats: Excel (.xlsx, .xls) or CSV
                  </p>
                </div>
              ) : (
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <FiUpload className="h-6 w-6 text-blue-500" />
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{selectedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <FiX className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              )}
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!selectedFile || loading}
              className={`w-full mt-6 py-3 px-4 rounded-lg font-medium transition-colors ${
                !selectedFile || loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {loading ? "Uploading..." : "Upload Questions"}
            </button>

            {loading ? (
              <div className="mt-8">
                <TableLoading />
              </div>
            ) : list.length > 0 ? (
              <div className="mt-8">
                <QuestionTable questions={list} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
