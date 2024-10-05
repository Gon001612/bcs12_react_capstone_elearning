import React from "react";

const Popup = ({ visible, onClose, onConfirm, course }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Xác nhận ghi danh</h2>
        <p>
          Bạn có chắc muốn ghi danh vào khóa học{" "}
          <strong>{course?.taiKhoan}</strong> không?
        </p>
        <div className="mt-5 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
