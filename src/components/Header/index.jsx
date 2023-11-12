import React from "react";
import logo from "../../assets/images/logo.jpg";
import "./header.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, message } from "antd";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { callLogout } from "../../service/api";

const { Search } = Input;

const Header = () => {
  const onSearch = (value) => console.log(value);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    const logout = await callLogout();
    if (logout.statusCode === 201) {
      message.success(
        "Logout thành công! sẽ tự động chuyển sang login sau 3s",
        3
      ); // Hiển thị thông báo trong 3 giây
      setTimeout(() => {
        dispatch(doLogoutAction(false));
        localStorage.removeItem("access_token");
        window.location.href = "/login"; // Chuyển hướng sau khi thông báo hiển thị đủ thời gian
      }, 3000); // Đợi 3 giây
    } else {
    }
  };
  const items = [
    {
      label: <Link to="/login">Đăng nhập</Link>,
      key: "0",
    },
    {
      label: <Link onClick={handleLogout}>Đăng xuất</Link>,
      key: "1",
    },
  ];
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const userName = useSelector((state) => state.account.user.fullName);

  return (
    <div className="container">
      <div className="wrapper-logo">
        <img src={logo} className="logo" />
      </div>
      <div className="input">
        <Space direction="vertical">
          <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{ width: 800 }}
          />
        </Space>
      </div>
      <div>
        <AiOutlineShoppingCart></AiOutlineShoppingCart>
      </div>
      <div>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              {isAuthenticated ? userName : "Tài khoản"}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
