import { Tabs } from "antd";
import "./App.css";
import { NavLink, Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { Typography } from "antd";

function App() {
  return (
    <>
      <header>
        <Typography.Title>Software Quotes</Typography.Title>
      </header>
      <Navbar />
      <div
        style={{
          marginTop: "24px",
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default App;
