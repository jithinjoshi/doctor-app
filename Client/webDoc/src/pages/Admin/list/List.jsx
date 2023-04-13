import "./list.scss"
import Sidebar from "../../../components/Admin/sidebar/Sidebar"
import Navbar from "../../../components/Admin/navbar/Navbar"
import Datatable from "../../../components/Admin/datatable/Datatable"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default List