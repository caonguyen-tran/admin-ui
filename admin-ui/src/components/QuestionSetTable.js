import React, { useState } from "react";
import { convertISOTimeToDatetime } from "../utils/Common";
import { Link } from "react-router-dom";

const QuestionSetTable = ({ questionSets }) => {
  const [isCreate, setIsCreate] = useState();

  const toggleIsCreate = () => {
    setIsCreate(!isCreate);
  };
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Question set</h2>
      <div className="flex mb-4 w-full justify-between px-2">
        <div className="flex">
          <input
            type="text"
            placeholder="Search Users"
            className="border border-gray-300 rounded p-2 mr-2"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Go
          </button>
        </div>
      </div>
      <div className="max-h-svh overflow-y-auto">
        <table className="min-w-full bg-white border">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Created Date</th>
              <th className="border px-4 py-2">Updated Date</th>
              <th className="border px-4 py-2">Reading part</th>
              <th className="border px-4 py-2">Year Release</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {questionSets.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">
                  {convertISOTimeToDatetime(item.createdDate)}
                </td>
                <td className="border px-4 py-2">
                  {convertISOTimeToDatetime(item.updatedDate)}
                </td>
                <td className="border px-4 py-2">{item.readingPart}</td>
                <td className="border px-4 py-2">{item.yearOf}</td>
                <td className="border px-4 py-2">
                  {!item.isActive ? (
                    <div
                      className="h-9 w-36 bg-slate-500 rounded hover:bg-slate-600 transition-all ease-linear flex justify-center content-center"
                      onClick={toggleIsCreate}
                    >
                      <Link to={`/create-question/${item.id}`}className="text-center leading-9 text-white">Tạo bộ câu hỏi</Link>
                    </div>
                  ) : (
                    <div
                      className="h-9 w-36 bg-white rounded flex justify-center"
                    >
                      <p className="cursor-pointer text-black leading-9 font-bold">Existed</p>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionSetTable;
