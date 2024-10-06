import React, { useEffect, useState } from "react";
import { khoaHocService } from "../../service/khoaHoc.service";
import { Card } from "antd";

const ListCoursePage = () => {
  const [listKhoaHoc, setListKhoaHoc] = useState([]);
  useEffect(() => {
    khoaHocService
      .layDanhSachKhoaHoc()
      .then((res) => {
        console.log(res.data);
        const limitedItems = res.data.slice(0, 8);
        setListKhoaHoc(limitedItems);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container space-y-5">
      <h2 className="text-3xl">Các Khoá Học Phổ Biến </h2>
      <div className="grid grid-cols-4 gap-5">
        {listKhoaHoc.length > 0 ? (
          listKhoaHoc.map((item, index) => (
            <Card
              hoverable
              style={{
                width: 320,
                border: 2,
              }}
              cover={
                <img
                  alt="example"
                  src={item.hinhAnh}
                  className="w-full h-[229px]"
                />
              }
            >
              <div className="space-y-3">
                <h2 className="text-xl font-medium uppercase border-b-2">
                  {item.danhMucKhoaHoc.tenDanhMucKhoaHoc}
                </h2>
                <p>{item.moTa}</p>
                <div className="flex items-center justify-between">
                  <p>
                    Lượt xem:{" "}
                    <span className="ml-2">
                      <i class="fa-solid fa-eye"></i>
                    </span>{" "}
                    {item.luotXem}
                  </p>
                  <p>
                    {" "}
                    Số học viên:{" "}
                    <span className="ml-2">
                      <i class="fa-solid fa-user"></i>
                    </span>{" "}
                    {item.soLuongHocVien}{" "}
                  </p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <p>Không có khóa học nào được tìm thấy.</p>
        )}
      </div>
    </div>
  );
};

export default ListCoursePage;
