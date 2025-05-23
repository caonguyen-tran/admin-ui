import React, { useState } from "react";
import Table from "./common/Table";
import { getDatetimeDetail } from "../utils/Common";
import UserDialog from "./dialog/UserDialog";

const UserTable = ({ users }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState('add');

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
      render: (user) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          user.isActive 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {user.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setDialogMode('add');
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDialogSubmit = (userData) => {
    if (dialogMode === 'add') {
      // Handle create new user
      console.log("Creating new user:", userData);
    } else {
      // Handle update existing user
      console.log("Updating user:", userData);
    }
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleEdit = (user) => {
    setDialogMode('edit');
    setSelectedUser({
      ...user,
      role: user.roles[0].name, // Convert roles array to single role
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (user) => {
    // Handle delete user
    console.log("Delete user:", user);
  };

  return (
    <>
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
      <UserDialog
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSubmit={handleDialogSubmit}
        user={selectedUser}
        mode={dialogMode}
      />
    </>
  );
};

export default UserTable;
