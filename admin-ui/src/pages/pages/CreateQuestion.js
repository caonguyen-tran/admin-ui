import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/SideBar";
import TableLoading from "../../common/TableLoading";
import { adminEndpoints, authApi } from "../../APIs/APIs";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { convertISOTimeToDatetime } from "../../utils/Common";

const CreateQuestion = () => {
  const [loading, setLoading] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const { current } = useAuth();
  const [list, setList] = useState([]);
  const { questionSetId } = useParams();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setLoading(true);
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log(formData.values);

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
      setLoading(false);
    } catch (ex) {
      console.log("Error uploading file: " + ex);
    }
  };

  return (
    <div className="flex min-h-lvh bg-red-50">
      <Sidebar />
      <div className="flex-grow bg-gray-100 p-6">
        <Header />
        <div className="h-screen bg-gray-100 flex">
          <div className="bg-white p-6 rounded-lg shadow-md w-full mt-10">
            <h1 className="text-xl font-bold mb-4 text-center">
              Upload Your File
            </h1>
            <input
              type="file"
              onChange={handleFileChange}
              className="mb-4 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            {selectedFile && (
              <div className="mb-4">
                <p>File name: {selectedFile.name}</p>
                <p>File size: {(selectedFile.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
            <button
              onClick={handleUpload}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
            >
              Upload
            </button>
            {loading ? (
              <TableLoading />
            ) : (
              <div className="max-h-svh overflow-y-auto mt-6">
                <table className="min-w-full bg-white border">
                  <thead className="sticky top-0 bg-gray-200">
                    <tr>
                      <th className="border px-4 py-2">Question set id</th>
                      <th className="border px-4 py-2">Question set name</th>
                      <th className="border px-4 py-2">Reading part</th>
                      <th className="border px-4 py-2">Question Number</th>
                      <th className="border px-4 py-2">Content</th>
                      <th className="border px-4 py-2">Created Date</th>
                      <th className="border px-4 py-2">Updated Date</th>
                      <th className="border px-4 py-2">Answer 1</th>
                      <th className="border px-4 py-2">Answer 2</th>
                      <th className="border px-4 py-2">Answer 3</th>
                      <th className="border px-4 py-2">Answer 4</th>
                      <th className="border px-4 py-2">Explain Answer</th>
                      <th className="border px-4 py-2">Correct Answer</th>
                      <th className="border px-4 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item) => (
                      <tr key={item.id}>
                        <td className="border px-4 py-2">
                          {item.questionSet.id}
                        </td>
                        <td className="border px-4 py-2">
                          {item.questionSet.name}
                        </td>
                        <td className="border px-4 py-2">
                          {item.questionSet.readingPart}
                        </td>
                        <td className="border px-4 py-2">
                          {item.questionNumber}
                        </td>
                        <td className="border px-4 py-2">
                          {item.questionContent}
                        </td>
                        <td className="border px-4 py-2">
                          {convertISOTimeToDatetime(item.createdDate)}
                        </td>
                        <td className="border px-4 py-2">
                          {convertISOTimeToDatetime(item.updatedDate)}
                        </td>
                        <td className="border px-4 py-2">
                          {item.answers[0].content}
                        </td>
                        <td className="border px-4 py-2">
                          {item.answers[1].content}
                        </td>
                        <td className="border px-4 py-2">
                          {item.answers[2].content}
                        </td>
                        <td className="border px-4 py-2">
                          {item.answers[3].content}
                        </td>
                        <td className="border px-4 py-2">
                          {item.explainAnswer}
                        </td>
                        <td className="border px-4 py-2">
                          {item.correctAnswer}
                        </td>
                        <td className="border px-4 py-2">Sua</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
