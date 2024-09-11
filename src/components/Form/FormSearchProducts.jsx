import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { path } from '../../common/path'

const FormSearchProducts = ({ setOpenDropdown, handleGetValueChildren }) => {
    const navigate = useNavigate()
    const [valueSearch, setValueSearch] = useState("")

     // Theo dõi thay đổi của valueSearch để kiểm soát dropdown và lấy giá trị
    useEffect(() => {
        if (setOpenDropdown && handleGetValueChildren) {
            if (!valueSearch) {
                setOpenDropdown(false) // Đóng dropdown nếu không có giá trị tìm kiếm
            }
            handleGetValueChildren(valueSearch)
        }
    }, [valueSearch, setOpenDropdown, handleGetValueChildren])


    const handleSubmit = (event) => {
        event.preventDefault()
        navigate(`${path.courseList}?tenKhoaHoc=${valueSearch}`)
        setValueSearch("");
    }

    const handleChange = (event) => {
        setValueSearch(event.target.value)
    }

    return (

        <form onSubmit={handleSubmit} >
            <div className='flex items-center justify-between w-[500px] border rounded-md border-black py-1 px-4 '>
                <input onChange={handleChange} className='flex-1 focus:border-none focus:outline-none' type="text" placeholder='Nhập Tên Khoá Học' />
                <button className='p-2 hover:text-orange-500 duration-200 text-sm'> <i className="fa-solid fa-magnifying-glass"></i> </button>
            </div>
        </form>

    )
}

export default FormSearchProducts
