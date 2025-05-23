import React from "react";
import Table from "./common/Table";
import { convertISOTimeToDatetime } from "../utils/Common";
import { Link } from "react-router-dom";

const QuestionSetTable = ({ questionSets }) => {
  const columns = [
    {
      key: "questionSet",
      label: "Question Set",
      render: (set) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {set.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{set.name}</div>
            <div className="text-sm text-gray-500">ID: {set.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (set) => (
        <div className="max-w-xs truncate">{set.description}</div>
      ),
    },
    {
      key: "readingPart",
      label: "Reading Part",
      render: (set) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {set.readingPart}
        </span>
      ),
    },
    {
      key: "yearOf",
      label: "Year Release",
      render: (set) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {set.yearOf}
        </span>
      ),
    },
    {
      key: "createdDate",
      label: "Created Date",
      render: (set) => convertISOTimeToDatetime(set.createdDate),
    },
    {
      key: "updatedDate",
      label: "Updated Date",
      render: (set) => convertISOTimeToDatetime(set.updatedDate),
    },
    {
      key: "status",
      label: "Status",
      render: (set) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          set.isActive ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {set.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (set) => (
        !set.isActive ? (
          <Link
            to={`/create-question/${set.id}`}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Create Questions
          </Link>
        ) : (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            Questions Exist
          </span>
        )
      ),
    },
  ];

  const handleAdd = () => {
    // Handle add question set
    console.log("Add question set");
  };

  const handleEdit = (set) => {
    // Handle edit question set
    console.log("Edit question set:", set);
  };

  const handleDelete = (set) => {
    // Handle delete question set
    console.log("Delete question set:", set);
  };

  return (
    <Table
      title="Question Set Management"
      data={questionSets}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={["name", "description", "readingPart", "yearOf"]}
      searchPlaceholder="Search question sets by name, description, reading part or year..."
      addButtonText="Add New Question Set"
    />
  );
};

export default QuestionSetTable;
