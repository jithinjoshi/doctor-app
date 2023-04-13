import "./patients.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns} from "../../../patientDatatable";
import { Link } from "react-router-dom";
import { useState } from "react";

const Patients = ({patients}) => {
  const [data, setData] = useState();

  const handleDelete = (id) => {
    setData(patients)
    
    setData(data.filter((item) => item._id !== id));
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
              Block
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Doctors List
      </div>
      <DataGrid
        className="datagrid"
        rows={patients}
        getRowId={(row) => row._id} 
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default Patients;