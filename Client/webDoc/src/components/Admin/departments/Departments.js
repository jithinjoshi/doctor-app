import "./departments.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../../departmentDatatable";
import { Link } from "react-router-dom";
import { useState } from "react";
import AddDepartment from "../addDepartment/AddDepartment";
import {deleteDepartment } from "../../../Helpers/adminHelper";
import Swal from "sweetalert2";

const Departments = ({ departments,setDepartments}) => {
  const [show, setShow] = useState(false);


  const handleDelete = async (id) => {
    try {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          const deleteDep= await deleteDepartment(id);
          setDepartments(deleteDep?.data?.departments)

          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      
    } catch (error) {
      return error
      
    }
    

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
              onClick={() => handleDelete(params?.row?._id)}
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
        Departments
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

      <AddDepartment onClose={handleOnClose} visible={show} setDepartments={setDepartments}/>
    </div>
  );
};

export default Departments;
