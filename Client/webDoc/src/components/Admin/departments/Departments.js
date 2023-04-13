import "./departments.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../departmentDatatable";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddDepartment from "../addDepartment/AddDepartment";

const Departments = ({ departments }) => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState();

  const handleDelete = (id) => {

  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  const handleOnClose = () => setShow(false);
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Doctors List
        {/* <Link to="/admin/addDepartment" className="link">
          Add New
        </Link> */}
        <button className="link" onClick={()=>setShow(true)}>
          Add New
        </button>
      </div>
      <DataGrid
        className="datagrid"
        rows={departments}
        getRowId={(row) => row._id}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />

      <AddDepartment onClose={handleOnClose} visible={show} />
    </div>
  );
};

export default Departments;
