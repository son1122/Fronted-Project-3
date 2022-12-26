import './OrderSide.css'
const OrderSide = () => {
    return (
        <div className={"order-side-grid"}>
            <p>Order Side</p>
            <div className={"order-side-detail-grid"}>
                <p>Select Table</p>
                <div>
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
                <p>Total</p>
            </div>
            <button>Confirm</button>
        </div>
    );
}

export default OrderSide;