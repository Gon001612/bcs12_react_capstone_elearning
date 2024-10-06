import { Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { congViecService } from "../../service/congViec.service";
import { Link, useNavigate } from "react-router-dom";

const WrapperSuggestJob = ({ children }) => {
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

export default WrapperSuggestJob;
