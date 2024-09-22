import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { path } from "../../common/path";

import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { nguoiDungService } from "../../service/nguoiDung.service";
import useDebounce from "../../hooks/useDebounce";

const FormSearchProduct = () => {
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();
  const debounce = useDebounce(valueSearch, 1000);
  const [items, setItems] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(false);

  useEffect(() => {
    if (valueSearch) {
      nguoiDungService
        .layTenUser(valueSearch)
        .then((res) => {
          console.log(res.data);
          let newItems = res.data.slice(0, 4).map((item, index) => {
            return {
              key: index.toString(),
              label: (
                <Link className="flex items-center space-x-4">
                  <h2>{item.taiKhoan}</h2>
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
        });
    }
  }, [debounce]);

  const handleChange = (e) => {
    setValueSearch(e.target.value);
    if (!e.target.value) {
      setOpenDropdown(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        open={openDropdown}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between w-[500px] border rounded-md border-black pl-4">
            <input
              onChange={handleChange}
              className="flex-1 focus:border-none focus:outline-none"
              type="text"
              placeholder="nhập vào tài khoản hoặc tên người dùng"
            />
            <button type="submit" className="p-2 text-sm">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
      </Dropdown>
    </>
  );
};

export default FormSearchProduct;
