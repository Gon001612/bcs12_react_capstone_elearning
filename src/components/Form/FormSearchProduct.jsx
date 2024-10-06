import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { nguoiDungService } from "../../service/nguoiDung.service";

const FormSearchProduct = ({
  placeholder = "Nhập thông tin cần tìm kiếm",
  handleGetValueChildren,
}) => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/search?keyword=${valueSearch}`);
  };

  // Debounce input để tránh gọi API liên tục
  const handleSearch = debounce(async (value) => {
    if (value) {
      try {
        const response = await nguoiDungService.TimKiemNguoiDung(value); // Gọi API tìm kiếm người dùng
        const filteredSuggestions = response.data.map((user) => ({
          taiKhoan: user.taiKhoan,
          hoTen: user.hoTen,
        }));
        setSuggestions(filteredSuggestions); // Cập nhật danh sách gợi ý
        if (handleGetValueChildren) handleGetValueChildren(filteredSuggestions); // Trả dữ liệu cho component cha
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  }, 500); // Thời gian debounce 500ms

  const handleChange = (event) => {
    const value = event.target.value;
    setValueSearch(value);
    handleSearch(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between w-[500px] border rounded-md border-black pl-4">
        <input
          onChange={handleChange}
          className="flex-1 focus:border-none focus:outline-none"
          type="text"
          placeholder={placeholder}
          value={valueSearch}
        />
        <button type="submit" className="p-2 text-sm">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="bg-white border border-gray-300">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="p-2 hover:bg-gray-200">
              {suggestion.taiKhoan} - {suggestion.hoTen}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
};

export default FormSearchProduct;
