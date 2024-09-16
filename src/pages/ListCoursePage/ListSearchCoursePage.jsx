import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { khoaHocService } from '../../service/KhoaHoc.service'
import { Card } from 'antd'


const ListSearchCoursePage = () => {
    const [searchParam, setSearchParam] = useSearchParams()
    const [listCourse, setListCourse] = useState([])
    const tenKhoaHoc = searchParam.get("tenKhoaHoc");
    console.log(searchParam.get("tenKhoaHoc"))

    useEffect(() =>{
        if (tenKhoaHoc) {
            // Gọi API lấy danh sách khoá học theo tên
            khoaHocService.layDanhSachKhoaHocTheoTen(tenKhoaHoc)
                .then((res) => {
                    console.log(res.data);
                    // Lưu kết quả trả về vào listCourse
                    setListCourse(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [tenKhoaHoc]); // useEffect phụ thuộc vào tenKhoaHoc
  return (
    <div className="container h-full">
              <h1 className='text-5xl font-bold'>Danh sách khoá học theo tên : {searchParam.get("tenKhoaHoc") ? searchParam.get("tenKhoaHoc") : ""}</h1>
              <div className="grid grid-cols-4 gap-10 mt-10">
              {
                    listCourse.length > 0 ? (
                        listCourse.map((item, index) => {
                            return <Card
                            hoverable
                            style={{
                                width: 320,
                                border: 2,
                            }}
                            cover={<img alt="example" src={item.hinhAnh} className='w-full h-[229px]' />}
                        >
                            <div className='space-y-3'>
                                <h2 className='text-xl font-medium uppercase border-b-2'>{item.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h2>
                                <div className=''>
                                <p>{item.moTa}</p>

                                </div>
                                <div className='flex items-center justify-between' >
                                    <p >Lượt xem: <span className='ml-2'><i class="fa-solid fa-eye"></i></span>  {item.luotXem}</p>
                                    <p> Số học viên: <span className='ml-2'><i class="fa-solid fa-user"></i></span> {item.soLuongHocVien} </p>
                                </div>
                            </div>
                        </Card>
                            
                        })
                    ) : (
                        <p>Không tìm thấy khóa học nào với tên</p>
                    )
                }
              </div>

    </div>
  )
}

export default ListSearchCoursePage
