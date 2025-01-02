import { Outlet } from "react-router-dom"

function GrandFather() {
  return (
    <div>
      <h5>Hi! I`m the grandFather</h5>
      <Outlet/>
    </div>
  )
}

export default GrandFather
