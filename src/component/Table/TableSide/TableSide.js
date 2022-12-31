import "./TableSide.css"
import React, {useState, useEffect} from "react";
import axios from "axios";



const TableSide = ({selTable, order, setOrder, orderDetail}) => {

  const [menuItem , setMenuItem] = useState([])

  useEffect(() => {
    axios
      .get(`http://localhost:3001/menu_items`)
      .then((res) => {
        console.log("ALL menu DATA FROM BACKEND >>> ", res.data);
        setMenuItem(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

//Map menu API
let menuDetail = 0

menuDetail = menuItem.map(item =>{ 
  return({
      id: item.id,
      name : item.name,
      price : item.price
    } 
    )
})

// Map orderdetail API 
  let tableOrderDetail = 0
try {
  tableOrderDetail = orderDetail.map(item =>{ 
  // use if to fillter orderdetail by order id
    if(item.order_id == order){
      return(<div key={item.id}>
        {item.order_id}
        {item.menu_item_id}
        {item.quantity}
      </div>
        
      
      )
    }
  })
   


} catch (error) {
}

    return (
        <div className={"table-side-grid"}>
            <p>Table Number {selTable}</p>

            <div>
                <div className={"table-side-detail-grid"} >   

                    <p>Order detail </p>
                    {tableOrderDetail}
                </div>  
            </div>
            <p>Total Price</p>
            <button>Check Button</button>
        </div>
    );
}
export default TableSide;