import React from "react";
import Table from "./common/Table";
import { convertISOTimeToDatetime } from "../utils/Common";

const QuestionTable = ({ questions }) => {
  const columns = [
    {
      key: "questionSet",
      label: "Question Set",
      render: (question) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {question.questionSet.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{question.questionSet.name}</div>
            <div className="text-sm text-gray-500">ID: {question.questionSet.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "questionNumber",
      label: "Question #",
      render: (question) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {question.questionNumber}
        </span>
      ),
    },
    {
      key: "questionContent",
      label: "Content",
      render: (question) => (
        <div className="max-w-xs truncate">{question.questionContent}</div>
      ),
    },
    {
      key: "answers",
      label: "Answers",
      render: (question) => (
        <div className="space-y-1">
          {question.answers.map((answer, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium">{index + 1}.</span> {answer.content}
            </div>
          ))}
        </div>
      ),
    },
    {
      key: "correctAnswer",
      label: "Correct Answer",
      render: (question) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {question.correctAnswer}
        </span>
      ),
    },
    {
      key: "explainAnswer",
      label: "Explanation",
      render: (question) => (
        <div className="max-w-xs truncate">{question.explainAnswer}</div>
      ),
    },
    {
      key: "createdDate",
      label: "Created Date",
      render: (question) => convertISOTimeToDatetime(question.createdDate),
    },
    {
      key: "updatedDate",
      label: "Updated Date",
      render: (question) => convertISOTimeToDatetime(question.updatedDate),
    },
  ];

  const handleAdd = () => {
    // Handle add question
    console.log("Add question");
  };

  const handleEdit = (question) => {
    // Handle edit question
    console.log("Edit question:", question);
  };

  const handleDelete = (question) => {
    // Handle delete question
    console.log("Delete question:", question);
  };

  return (
    <Table
      title="Question Management"
      data={questions}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={["questionSet.name", "questionContent", "explainAnswer"]}
      searchPlaceholder="Search questions by set name, content or explanation..."
      addButtonText="Add New Question"
    />
  );
};

export default QuestionTable;
