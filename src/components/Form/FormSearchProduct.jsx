import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "../../common/path";

const FormSearchProduct = () => {
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValueSearch(e.target.value);
    console.log("hihi");
  };
  const handleSubmit = (e) => {
    console.log("hello");
    console.log(valueSearch);
    e.preventDefault();
    navigate(`${path.listUser}?search=${valueSearch}`);
  };

  return (
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
  );
};

export default FormSearchProduct;
