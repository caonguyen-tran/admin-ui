import React from "react";
import Table from "./common/Table";
import { convertISOTimeToDatetime } from "../utils/Common";

const WordTable = ({ words }) => {
  const columns = [
    {
      key: "word",
      label: "Word",
      render: (word) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {word.word.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{word.word}</div>
            <div className="text-sm text-gray-500">ID: {word.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "pofSpeech",
      label: "Word Type",
      render: (word) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {word.pofSpeech}
        </span>
      ),
    },
    {
      key: "pronunciation",
      label: "Pronunciation",
    },
    {
      key: "definition",
      label: "Definition",
      render: (word) => (
        <div className="max-w-xs truncate">{word.definition}</div>
      ),
    },
    {
      key: "example",
      label: "Example",
      render: (word) => (
        <div className="max-w-xs truncate">{word.example}</div>
      ),
    },
    {
      key: "level",
      label: "Level",
      render: (word) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {word.level}
        </span>
      ),
    },
    {
      key: "createdDate",
      label: "Created Date",
      render: (word) => convertISOTimeToDatetime(word.createdDate),
    },
    {
      key: "updatedDate",
      label: "Updated Date",
      render: (word) => convertISOTimeToDatetime(word.updatedDate),
    },
  ];

  const handleAdd = () => {
    // Handle add word
    console.log("Add word");
  };

  const handleEdit = (word) => {
    // Handle edit word
    console.log("Edit word:", word);
  };

  const handleDelete = (word) => {
    // Handle delete word
    console.log("Delete word:", word);
  };

  return (
    <Table
      title="Word Management"
      data={words}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={["word", "definition", "example"]}
      searchPlaceholder="Search words by word, definition or example..."
      addButtonText="Add New Word"
    />
  );
};

export default WordTable;
