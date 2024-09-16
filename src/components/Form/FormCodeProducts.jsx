import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { khoaHocService } from '../../service/KhoaHoc.service';
import { Dropdown, Space } from 'antd';
import { path } from '../../common/path';


const FormCodeProducts = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách danh mục khóa học
    khoaHocService.layDanhMucKhoaHoc()
      .then((res) => {
        let newItemApi = res.data.map((item, index) => {
          return {
            label: (
              // Sử dụng Link để điều hướng khi người dùng nhấp vào
              <Link
                // to={`${path.homePage}?maDanhMuc=${item.maDanhMuc}`} 
                to={`/danhMucKhoaHoc?maDanhMuc=${item.maDanhMuc}`}
                className="cursor-pointer"
              >
                {item.tenDanhMuc}
              </Link>
            ),
            key: index.String,
          };
        });
        setItems(newItemApi);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
          <Space className="py-2 px-4 bg-white rounded-md hover:text-yellow-400/70 duration-200 hover:bg-yellow-800">
            <span>
              <i className="fa-solid fa-bars"></i>
            </span>
            Danh Mục Khoá Học
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

export default FormCodeProducts;
