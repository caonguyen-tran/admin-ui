import React from "react";
import Table from "./common/Table";
import { convertISOTimeToDatetime } from "../utils/Common";

const CollectionTable = ({ collections }) => {
  const columns = [
    {
      key: "collection",
      label: "Collection",
      render: (collection) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {collection.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{collection.name}</div>
            <div className="text-sm text-gray-500">ID: {collection.id}</div>
          </div>
        </div>
      ),
    },
    {
      key: "description",
      label: "Description",
      className: "max-w-xs",
      render: (collection) => (
        <div className="truncate">{collection.description}</div>
      ),
    },
    {
      key: "image",
      label: "Image",
      className: "w-24",
      render: (collection) => (
        <img
          src={collection.image}
          alt={collection.name}
          className="h-10 w-10 object-cover rounded"
        />
      ),
    },
    {
      key: "createAt",
      label: "Created Date",
      className: "w-40",
      render: (collection) => convertISOTimeToDatetime(collection.createAt),
    },
    {
      key: "updateAt",
      label: "Updated Date",
      className: "w-40",
      render: (collection) => convertISOTimeToDatetime(collection.updateAt),
    },
  ];

  const handleAdd = () => {
    // Handle add collection
    console.log("Add collection");
  };

  const handleEdit = (collection) => {
    // Handle edit collection
    console.log("Edit collection:", collection);
  };

  const handleDelete = (collection) => {
    // Handle delete collection
    console.log("Delete collection:", collection);
  };

  return (
    <Table
      title="Collection Management"
      data={collections}
      columns={columns}
      onAdd={handleAdd}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchFields={["name", "description"]}
      searchPlaceholder="Search collections by name or description..."
      addButtonText="Add New Collection"
    />
  );
};

export default CollectionTable;
