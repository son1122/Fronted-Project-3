import "./Layout.css"
import Navbar from "../Navbar/Navbar";
import View from "../View/View";

const Layout = () => {
    return (
        <div className={"layout-grid"}>
            <View/>
            <Navbar/>
        </div>
    );
}

export default Layout;