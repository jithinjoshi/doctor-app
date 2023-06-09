import Sidebar from "../../../components/Admin/sidebar/Sidebar";
import Navbar from "../../../components/Admin/navbar/Navbar";
import "./home.scss";
import Widget from "../../../components/Admin/widget/Widget";
import Featured from "../../../components/Admin/featured/Featured";
import Chart from "../../../components/Admin/chart/Chart";
import Table from "../../../components/Admin/table/Table";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <Featured />
          <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Home;
