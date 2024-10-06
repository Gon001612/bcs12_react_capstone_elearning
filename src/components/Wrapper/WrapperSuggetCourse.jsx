import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Link } from "react-router-dom";
import { khoaHocService } from "../../service/khoaHoc.service";

const WrapperSuggetCourse = ({ children }) => {
  const [items, setItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 1000);

  const handleGetValueChildren = (valueChildrend) => {
    setValue(valueChildrend);
  };

  const clonedChildren = React.cloneElement(children, {
    setOpenDropdown,
    handleGetValueChildren,
  });
  useEffect(() => {
    if (value) {
      khoaHocService
        .layDanhSachKhoaHocTheoTen(value)
        .then((res) => {
          console.log(res.data);
          let newItems = res.data.slice(0, 4).map((item, index) => {
            return {
              key: index.toString(),
              label: (
                <Link className="flex items-center space-x-4">
                  <div className="w-1/5">
                    <img src={item.hinhAnh} className="h-24" alt="" />
                  </div>
                  <div className="w-3/5">
                    <h4>{item.biDanh}</h4>
                    <p>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</p>
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
                </Link>
              ),
            };
          });
          setItems(newItems);
          setOpenDropdown(true);
        })
        .catch((err) => {
          console.log(err);
          setOpenDropdown(false);
          // sử dụng một thông báo khi có lỗi từ Backend
        });
    }
  }, [debounceValue]);

  return (
    <Dropdown
      menu={{
        items,
      }}
      open={openDropdown}
    >
      {clonedChildren}
    </Dropdown>
  );
};

export default WrapperSuggetCourse;
