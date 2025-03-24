import { Space } from "antd";
import React from "react";
import { NavLink } from "react-router";

const items = [
  {
    key: "authors",
    label: "Author",
  },
  {
    key: "quotes",
    label: "Quotes",
  },
  {
    key: "quote-of-the-day",
    label: "Home",
  },
];
const Navbar = () => {
  return (
    <header style={{
      marginTop:"24px"
  }}>
      <Space size={"large"}>
        {items.map((item) => {
          return (
            <NavLink className={"tab-links"} key={item.key} to={item.key}>
              {item.label}
            </NavLink>
          );
        })}
      </Space>
    </header>
  );
};

export default Navbar;
