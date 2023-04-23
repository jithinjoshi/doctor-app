import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MedicationIcon from '@mui/icons-material/Medication';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../../context/darkModeContext";
import { useContext } from "react";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/admin" style={{ textDecoration: "none" }}>
          <span className="logo">webDoc</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li style={{marginTop:"20px"}}>
            <DashboardIcon className="icon" />
            <Link to='/admin' style={{ textDecoration: "none" }}>
            <span>Dashboard</span>
            </Link>
            
          </li>
          <p className="title">LISTS</p>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li style={{marginTop:"20px"}}>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/admin/doctors" style={{ textDecoration: "none" }}>
            <li style={{marginTop:"10px"}}>
              <MedicationIcon className="icon" />
              <span>Doctors</span>
            </li>
          </Link>

          <Link to="/admin/departments" style={{ textDecoration: "none" }}>
            <li style={{marginTop:"10px"}}>
              <CategoryIcon className="icon" />
              <span>Departments</span>
            </li>
          </Link>
  
          <li style={{marginTop:"10px"}}>
            <CreditCardIcon className="icon" />
            <span>Transactions</span>
          </li>

          
          
          <p className="title">USER</p>
          <li style={{marginTop:"20px"}}>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li style={{marginTop:"10px"}}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      {/* <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div> */}
    </div>
  );
};

export default Sidebar;
