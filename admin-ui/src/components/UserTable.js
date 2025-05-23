import React from "react";
import Table from "./common/Table";
import { getDatetimeDetail } from "../utils/Common";

const UserTable = ({ users }) => {
  const columns = [
    {
      key: "user",
      label: "User",
      render: (user) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {user.username.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.username}</div>
            <div className="text-sm text-gray-500">ID: {user.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Role",
      render: (user) => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {user.roles[0].name}
        </span>
      ),
    },
    {
      key: "createdDate",
      label: "Created Date",
      render: (user) => getDatetimeDetail(user.createdDate),
    },
    {
      key: "status",
      label: "Status",
      render: () => (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    // Handle add user
    console.log("Add user");
  };

  const handleEdit = (user) => {
    // Handle edit user
    console.log("Edit user:", user);
  };

  const handleDelete = (user) => {
    // Handle delete user
    console.log("Delete user:", user);
  };

  return (
    <Table
      title="User Management"
      data={users}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={["username", "email"]}
      searchPlaceholder="Search users by name or email..."
      addButtonText="Add New User"
    />
  );
};

export default UserTable;
