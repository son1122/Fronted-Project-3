import "./TableSide.css"
const TableSide = () => {
    return (
        <div className={"table-side-grid"}>
            <p>Table Number</p>
            <div >
                <div className={"table-side-detail-grid"}>
                    <p>Fry Rice</p>
                    <p>1</p>
                    <p>120</p>
                </div>
                <div className={"table-side-detail-grid"}>
                    <p>Fry Rice</p>
                    <p>1</p>
                    <p>120</p>
                </div>
                <div className={"table-side-detail-grid"}>
                    <p>Fry Rice</p>
                    <p>1</p>
                    <p>120</p>
                </div>
                <div className={"table-side-detail-grid"}>
                    <p>Fry Rice</p>
                    <p>1</p>
                    <p>120</p>
                </div>
            </div>
            <p>Total Price</p>
            <button>Check Button</button>
        </div>
    );
}

export default TableSide;