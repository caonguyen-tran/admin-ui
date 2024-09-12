import React from "react";
import { convertISOTimeToDatetime } from "../utils/Common";

const LearnedTable = ({ learned }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Learned</h2>
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
        <button className="h-10 w-15 rounded-full bg-gray-500 shadow-inner text-center p-2">
          <p className="">+ Thêm</p>
        </button>
      </div>
      <div className="max-h-svh overflow-y-auto">
        <table className="min-w-full bg-white border">
          <thead className="sticky top-0 bg-gray-200">
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Learn By</th>
              <th className="border px-4 py-2">Word</th>
              <th className="border px-4 py-2">Collection</th>
              <th className="border px-4 py-2">Learn Date</th>
              <th className="border px-4 py-2">Due Date</th>
              <th className="border px-4 py-2">Learn Master Level</th>
              <th className="border px-4 py-2">Success Rate</th>
              <th className="border px-4 py-2">Review</th>
            </tr>
          </thead>
          <tbody>
            {learned.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.learnBy}</td>
                <td className="border px-4 py-2">{item.wordResponse.word}</td>
                <td className="border px-4 py-2">
                  {item.wordResponse.collectionId}
                </td>
                <td className="border px-4 py-2">
                  {convertISOTimeToDatetime(item.learnDate)}
                </td>
                <td className="border px-4 py-2">
                  {convertISOTimeToDatetime(item.dueDate)}
                </td>
                <td className="border px-4 py-2">{item.learnedMaster.name}</td>
                <td className="border px-4 py-2">{item.successRate}</td>
                <td className="border px-4 py-2">{item.review ? "true" : "false"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LearnedTable;
