import "./Dashboard.css"
import DashboardView from "./DashboardView/DashboardView";
import DashboardSide from "./DashboardSide/DashboardSide";

const Dashboard = () => {
    return (
        <div className={"dashboard-grid"}>
            <DashboardView/>
            <DashboardSide/>
        </div>
    );
}

export default Dashboard;