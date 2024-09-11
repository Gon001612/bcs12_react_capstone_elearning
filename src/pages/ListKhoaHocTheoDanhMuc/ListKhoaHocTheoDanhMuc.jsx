import React, { useEffect, useState } from 'react'
import { khoaHocService } from '../../service/KhoaHoc.service';
import { Link, useParams } from 'react-router-dom';

const ListKhoaHocTheoDanhMuc = () => {
  const [items, setItems] = useState([]);
  const [danhMuc, setDanhMuc] = useState([]);
  const { maDanhMuc } = useParams();

  useEffect(() => {
    // Lấy danh mục khóa học
    khoaHocService.layDanhMucKhoaHoc()
      .then((res) => {
        setDanhMuc(res.data); // Lưu danh mục khóa học
      })
      .catch((err) => {
        console.log(err);
      });

    // Lấy danh sách khóa học
    khoaHocService.layDanhSachKhoaHoc()
      .then((res) => {
        console.log(res.data);
        const limitedItems = res.data.slice(0, 10);
        setItems(limitedItems);

      })
      .catch((err) => {
        console.log(err);
      });
  },
   []);
   const filteredItems = items.filter((khoaHoc) => khoaHoc.maDanhMuc === maDanhMuc);


  return (
    <div>
    {/* Link để điều hướng qua các danh mục */}
    <nav>
      {danhMuc.map((dm) => (
        <Link
          key={dm.maDanhMuc}
          to={`/danh-muc/${dm.maDanhMuc}`}
          style={{ margin: '10px', textDecoration: 'none', color: 'blue' }}
        >
          {dm.tenDanhMuc}
        </Link>
      ))}
    </nav>

    <hr />

    {/* Hiển thị danh sách khóa học theo maDanhMuc */}
    <div>
      <h2>Danh sách khóa học cho danh mục: {maDanhMuc}</h2>
      {filteredItems.length > 0 ? (
        filteredItems.map((khoaHoc) => (
          <div key={khoaHoc.maKhoaHoc}>
            <h3>{khoaHoc.tenKhoaHoc}</h3>
            <p>{khoaHoc.moTa}</p>
          </div>
        ))
      ) : (
        <p>Không có khóa học nào trong danh mục này.</p>
      )}
    </div>
  </div>
  )
}

export default ListKhoaHocTheoDanhMuc
