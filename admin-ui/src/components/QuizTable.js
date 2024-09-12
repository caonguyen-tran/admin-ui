import React from "react";
import { convertISOTimeToDatetime } from "../utils/Common";

const CollectionTable = ({ collections }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Collections</h2>
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
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Created Date</th>
              <th className="border px-4 py-2">Updated Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {collections.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.description}</td>
                <td className="border px-4 py-2">
                  <img src={item.image} alt="img" />
                </td>
                <td className="border px-4 py-2">
                  {convertISOTimeToDatetime(item.updateAt)}
                </td>
                <td className="border px-4 py-2">
                  {convertISOTimeToDatetime(item.updateAt)}
                </td>
                <td className="border px-4 py-2">Action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollectionTable;
