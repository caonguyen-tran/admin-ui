import React from "react";
import Table from "./common/Table";
import { convertISOTimeToDatetime } from "../utils/Common";

const DownloadTable = ({ downloads }) => {
  const columns = [
    {
      key: "collection",
      label: "Collection",
      render: (download) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {download.collection.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{download.collection.name}</div>
            <div className="text-sm text-gray-500">ID: {download.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (download) => (
        <div className="max-w-xs truncate">{download.collection.description}</div>
      ),
    },
    {
      key: "downloadBy",
      label: "Download By",
      render: (download) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
          {download.downloadBy}
        </span>
      ),
    },
    {
      key: "downloadAt",
      label: "Download Date",
      render: (download) => convertISOTimeToDatetime(download.downloadAt),
    },
  ];

  const handleAdd = () => {
    // Handle add download
    console.log("Add download");
  };

  const handleEdit = (download) => {
    // Handle edit download
    console.log("Edit download:", download);
  };

  const handleDelete = (download) => {
    // Handle delete download
    console.log("Delete download:", download);
  };

  return (
    <Table
      title="Download Management"
      data={downloads}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={["collection.name", "collection.description", "downloadBy"]}
      searchPlaceholder="Search downloads by collection name, description or downloader..."
      addButtonText="Add New Download"
    />
  );
};

export default DownloadTable;
