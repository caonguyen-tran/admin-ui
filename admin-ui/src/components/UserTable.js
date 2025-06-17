import React, { useState } from "react";
import Table from "./common/Table";
import { getDatetimeDetail } from "../utils/Common";
import UserDialog from "./dialog/UserDialog";
import { adminEndpoints, authApi } from "../APIs/APIs";
import { useAuth } from "../context/AuthContext";
import AlertBox from "./common/AlertBox";

const UserTable = ({ users, roles, onUserUpdate }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [dialogMode, setDialogMode] = useState("add");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { current } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

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
            <div className="text-sm font-medium text-gray-900">
              {user.username}
            </div>
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
      render: (user) => {
        const role = user.roles[0].name;
        console.log(role);
        const roleColors = {
          ADMIN: {
            bg: "bg-red-100",
            text: "text-red-800",
          },
          FREE_USER: {
            bg: "bg-blue-100",
            text: "text-blue-800",
          },
          TRIAL_USER: {
            bg: "bg-green-100",
            text: "text-green-800",
          },
          EXPIRED_USER: {
            bg: "bg-gray-100",
            text: "text-gray-800",
          },
          // Role mặc định nếu không khớp
          PREMIUM_USER: {
            bg: "bg-yellow-100",
            text: "text-yellow-800",
          },
        };

        const { bg, text } = roleColors[role] || roleColors.default;

        return (
          <span
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${bg} ${text}`}
          >
            {role}
          </span>
        );
      },
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
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            !user.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {!user.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const handleAdd = () => {
    setDialogMode("add");
    setSelectedUser(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDialogSubmit = async (userData) => {
    try {
      if (dialogMode === "add") {
        // Handle create new user
        console.log("Creating new user:", userData);
        // Add your API call here
        setIsSuccess(true);
      } else {
        setIsLoading(true);
        await authApi(current.user.token).post(
          adminEndpoints["admin-update-user-role"],
          userData
        );
        setIsSuccess(true);
        setIsLoading(false);
        // Refresh the user list after successful update
        onUserUpdate();
      }
      setIsDialogOpen(false);
      setSelectedUser(null);
      setShowSuccessAlert(true);

      // Hide success alert after 3 seconds
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setIsSuccess(false);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    }
  };

  const handleEdit = (user) => {
    setDialogMode("edit");
    setSelectedUser({
      ...user,
      role: user.roles[0].name,
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
        roles={roles}
        isLoading={isLoading}
      />
      {showSuccessAlert && (
        <AlertBox
          isSuccess={isSuccess}
          messageSuccess="User created successfully!"
          messageError="Failed to save user. Please try again."
        />
      )}
    </>
  );
};

export default UserTable;
