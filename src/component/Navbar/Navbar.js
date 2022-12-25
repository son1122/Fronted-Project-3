import "./Navbar.css"

const Navbar = () => {
    return (
        <div className={"navbar-grid"}>
            <p></p>
            <a href={"/order"}>Main</a>
            <a href={"/table"}>Table</a>
            <a href={"/dashboard"}>Dashboard</a>
            <a href={"/order"}>Profile</a>
            <p></p>
        </div>
    );
}

export default Navbar;