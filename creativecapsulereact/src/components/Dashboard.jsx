import { App } from 'antd'
import React from 'react'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div>
        <App/>
        <Outlet />
    </div>
  )
}

export default Dashboard