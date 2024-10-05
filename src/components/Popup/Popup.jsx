import React from "react";
import { Table, Button, Space } from "antd";

const CourseList = ({ courses, onConfirm, onCancel, title }) => {
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tên khóa học",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Chờ xác nhận",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.pending ? (
            <>
              <Button onClick={() => onConfirm(record)} type="primary">
                Xác thực
              </Button>
              <Button onClick={() => onCancel(record)} danger>
                Hủy
              </Button>
            </>
          ) : (
            <Button onClick={() => onCancel(record)} danger>
              Hủy
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3>{title}</h3>
      <Table
        columns={columns}
        dataSource={courses}
        pagination={{ pageSize: 5 }}
        rowKey="name"
      />
    </div>
  );
};

const CourseRegistration = () => {
  const pendingCourses = [
    { name: "Tư duy lập trình", pending: true },
    { name: "Lập trình frontend", pending: true },
  ];

  const registeredCourses = [
    { name: "Tư duy lập trình", pending: false },
    { name: "Lập trình frontend", pending: false },
  ];

  const handleConfirm = (course) => {
    console.log("Confirmed:", course);
  };

  const handleCancel = (course) => {
    console.log("Cancelled:", course);
  };

  return (
    <div>
      <div className="course-select">
        <label>Chọn khóa học</label>
        <select>
          <option>Lập trình backend</option>
          <option>Lập trình frontend</option>
        </select>
        <button>Ghi danh</button>
      </div>

      <CourseList
        title="Khóa học chờ xác thực (Nếu không có thì khỏi hiển thị)"
        courses={pendingCourses}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />

      <CourseList
        title="Khóa học đã ghi danh (Nếu không có thì khỏi hiển thị)"
        courses={registeredCourses}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default CourseRegistration;
