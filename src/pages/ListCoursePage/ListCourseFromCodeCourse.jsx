import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { khoaHocService } from '../../service/KhoaHoc.service';
import { Card } from 'antd';

const ListCourseFromCodeCourse = () => {
  const [searchParam] = useSearchParams();
  let maDanhMuc = searchParam.get("maDanhMuc")

  const [courses, setCourses] = useState([]);
  useEffect(() => {
    console.log("mã danh mục lấy được",maDanhMuc)
    if (maDanhMuc) {
      khoaHocService.layKhoaHocTheoDanhMuc(maDanhMuc)
        .then(res => {
          setCourses(res.data); // Lưu danh sách khóa học
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [maDanhMuc]);


  return (
    <div>
      <h1>Danh sách khóa học theo danh mục: {maDanhMuc}</h1>
      <div className="grid grid-cols-4 gap-10 mt-10">
        {courses.map(course => (
          <div key={course.maKhoaHoc} >
           <Card
                            hoverable
                            style={{
                                width: 320,
                                border: 2,
                            }}
                            cover={<img alt="example" src={course.hinhAnh} className='w-full h-[229px]' />}
                        >
                            <div className='space-y-3'>
                                <h2 className='text-xl font-medium uppercase border-b-2'>{course.danhMucKhoaHoc.tenDanhMucKhoaHoc}</h2>
                                <div className=''>
                                <p>{course.moTa}</p>

                                </div>
                                <div className='flex items-center justify-between' >
                                    <p >Lượt xem: <span className='ml-2'><i class="fa-solid fa-eye"></i></span>  {course.luotXem}</p>
                                    <p> Số học viên: <span className='ml-2'><i class="fa-solid fa-user"></i></span> {course.soLuongHocVien} </p>
                                </div>
                            </div>
                        </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCourseFromCodeCourse
