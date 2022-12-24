import "./Order.css"
import OrderView from "./OrderView/OrderView";
import OrderSide from "./OrderSide/OrderSide";

const Order = () => {
    return (
        <div className={"order-grid"} style={{height:"90vh"}}>
            <OrderView/>
            <OrderSide/>
        </div>
    );
}

export default Order;