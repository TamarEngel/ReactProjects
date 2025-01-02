import React from 'react'
import { Outlet } from "react-router-dom";

function GrandMother() {
  return (
    <div>
      <h5>Hi! I`m the grandMother</h5>
      <Outlet/>
    </div>
  )
}

export default GrandMother
