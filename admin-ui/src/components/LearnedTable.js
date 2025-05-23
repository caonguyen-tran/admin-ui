import React from "react";
import Table from "./common/Table";
import { convertISOTimeToDatetime } from "../utils/Common";

const LearnedTable = ({ learned }) => {
  const columns = [
    {
      key: "word",
      label: "Word",
      render: (item) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {item.wordResponse.word.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{item.wordResponse.word}</div>
            <div className="text-sm text-gray-500">ID: {item.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "learnBy",
      label: "Learn By",
      render: (item) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
          {item.learnBy}
        </span>
      ),
    },
    {
      key: "collection",
      label: "Collection",
      render: (item) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {item.wordResponse.collectionId}
        </span>
      ),
    },
    {
      key: "learnDate",
      label: "Learn Date",
      render: (item) => convertISOTimeToDatetime(item.learnDate),
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (item) => convertISOTimeToDatetime(item.dueDate),
    },
    {
      key: "learnedMaster",
      label: "Master Level",
      render: (item) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {item.learnedMaster.name}
        </span>
      ),
    },
    {
      key: "successRate",
      label: "Success Rate",
      render: (item) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
          {item.successRate}%
        </span>
      ),
    },
    {
      key: "review",
      label: "Review",
      render: (item) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          item.review ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.review ? "Yes" : "No"}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    // Handle add learned item
    console.log("Add learned item");
  };

  const handleEdit = (item) => {
    // Handle edit learned item
    console.log("Edit learned item:", item);
  };

  const handleDelete = (item) => {
    // Handle delete learned item
    console.log("Delete learned item:", item);
  };

  return (
    <Table
      title="Learned Words Management"
      data={learned}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={["wordResponse.word", "learnBy", "learnedMaster.name"]}
      searchPlaceholder="Search by word, learner or master level..."
      addButtonText="Add New Learned Word"
    />
  );
};

export default LearnedTable;
