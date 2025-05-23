import React from "react";
import Table from "./common/Table";
import { convertISOTimeToDatetime } from "../utils/Common";

const QuizTable = ({ quizzes }) => {
  const columns = [
    {
      key: "quiz",
      label: "Quiz",
      render: (quiz) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {quiz.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{quiz.name}</div>
            <div className="text-sm text-gray-500">ID: {quiz.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      render: (quiz) => (
        <div className="max-w-xs truncate">{quiz.description}</div>
      ),
    },
    {
      key: "readingPart",
      label: "Reading Part",
      render: (quiz) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {quiz.readingPart}
        </span>
      ),
    },
    {
      key: "questionNumber",
      label: "Questions",
      render: (quiz) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {quiz.questionNumber}
        </span>
      ),
    },
    {
      key: "createdDate",
      label: "Created Date",
      render: (quiz) => convertISOTimeToDatetime(quiz.createdDate),
    },
    {
      key: "updatedDate",
      label: "Updated Date",
      render: (quiz) => convertISOTimeToDatetime(quiz.updatedDate),
    },
  ];

  const handleAdd = () => {
    // Handle add quiz
    console.log("Add quiz");
  };

  const handleEdit = (quiz) => {
    // Handle edit quiz
    console.log("Edit quiz:", quiz);
  };

  const handleDelete = (quiz) => {
    // Handle delete quiz
    console.log("Delete quiz:", quiz);
  };

  return (
    <Table
      title="Quiz Management"
      data={quizzes}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={["name", "description", "readingPart"]}
      searchPlaceholder="Search quizzes by name, description or reading part..."
      addButtonText="Add New Quiz"
    />
  );
};

export default QuizTable;
