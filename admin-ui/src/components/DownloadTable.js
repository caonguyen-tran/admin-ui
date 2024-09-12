import React from "react";
import { convertISOTimeToDatetime } from "../utils/Common";

const DownloadTable = ({ downloads }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Downloads</h2>
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
              <th className="border px-4 py-2">Collection name</th>
              <th className="border px-4 py-2">Collection description</th>
              <th className="border px-4 py-2">Download By</th>
              <th className="border px-4 py-2">Download Date</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.collection.name}</td>
                <td className="border px-4 py-2">
                  {item.collection.description}
                </td>
                <td className="border px-4 py-2">{item.downloadBy}</td>
                <td className="border px-4 py-2">{convertISOTimeToDatetime(item.downloadAt)}</td>
                <td className="border px-4 py-2">
                  <div className="flex flex-col align-middle justify-between">
                    <button className="bg-red-500 w-20 h-8 mb-1 rounded-sm">
                      Xóa
                    </button>
                    <button className="bg-green-500 w-20 h-8 rounded-sm">
                      Cập nhật
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DownloadTable;
