import "./Navbar.css";

const Navbar = () => {
    return (
        <div className={"navbar-grid"}>
            <p></p>
            <p></p>
            <div className="navbar-item-cont">
                <a href={"/order"}>
                    <img src="https://imgur.com/x2OyM62.png"></img>
                    <p>Main</p>
                </a>
            </div>
            <div className="navbar-item-cont">
                <a href={"/table"}>
                    <img src="https://imgur.com/F2p2s1h.png"></img>
                    <p>Table</p>
                </a>
            </div>
            <div className="navbar-item-cont">
                <a href={"/dashboard"}>
                    <img src="https://imgur.com/MuX5wVb.png"></img>
                    <p>Dashboard</p>
                </a>
            </div>
            <p></p>
            <p></p>
        </div>
    );
};

export default Navbar;
