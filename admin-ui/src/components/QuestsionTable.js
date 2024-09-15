import React, { useState } from "react";
import { convertISOTimeToDatetime } from "../utils/Common";

const QuestionTable = ({ questions }) => {
  const [isCreate, setIsCreate] = useState()

  const toggleIsCreate = () => {
    setIsCreate(!isCreate)
  }
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
              <th className="border px-4 py-2">Question set id</th>
              <th className="border px-4 py-2">Question set name</th>
              <th className="border px-4 py-2">Reading part</th>
              <th className="border px-4 py-2">Question Number</th>
              <th className="border px-4 py-2">Content</th>
              <th className="border px-4 py-2">Created Date</th>
              <th className="border px-4 py-2">Updated Date</th>
              <th className="border px-4 py-2">Answer 1</th>
              <th className="border px-4 py-2">Answer 2</th>
              <th className="border px-4 py-2">Answer 3</th>
              <th className="border px-4 py-2">Answer 4</th>
              <th className="border px-4 py-2">Explain Answer</th>
              <th className="border px-4 py-2">Correct Answer</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.questionSet.id}</td>
                <td className="border px-4 py-2">{item.questionSet.name}</td>
                <td className="border px-4 py-2">{item.questionSet.readingPart}</td>
                <td className="border px-4 py-2">{item.questionNumber}</td>
                <td className="border px-4 py-2">{item.questionContent}</td>
                <td className="border px-4 py-2">
                  {convertISOTimeToDatetime(item.createdDate)}
                </td>
                <td className="border px-4 py-2">
                  {convertISOTimeToDatetime(item.updatedDate)}
                </td>
                <td className="border px-4 py-2">{item.answers[0].content}</td>
                <td className="border px-4 py-2">{item.answers[1].content}</td>
                <td className="border px-4 py-2">{item.answers[2].content}</td>
                <td className="border px-4 py-2">{item.answers[3].content}</td>
                <td className="border px-4 py-2">{item.explainAnswer}</td>
                <td className="border px-4 py-2">{item.correctAnswer}</td>
                <td className="border px-4 py-2">
                    Sua
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuestionTable;
