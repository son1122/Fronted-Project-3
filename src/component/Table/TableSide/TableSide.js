import "./TableSide.css"
import React, {useState, useEffect} from "react";
import axios from "axios";
import { forEach } from "lodash";



const TableSide = ({selTable, order, orderDetail}) => {

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

  

// Map orderdetail API 
  let tableOrderDetail = 0
try {
  tableOrderDetail = orderDetail.map(item =>{ 
  // use if to fillter orderdetail by order id
    
  if(item.order_id != order){
    console.log("On Order");
  }else{ 
      let menuDetail = 0                    // Get menu name by order detail
       
      menuDetail = menuItem.map(food =>{ 
        if(item.menu_item_id == food.id){
        return({
          name : food.name,
          price : food.price
          })
        }}
      )

  // sent back to page
      return(<div key={item.id}>
        Name : {menuDetail[item.menu_item_id-1].name}
        quantity: {item.quantity}
        Price: {menuDetail[item.menu_item_id-1].price}
      </div> 
      )
    }
})
} catch (error) {
}

let checkOut = () => {
  const clearOrder= ()=> {
  if (order === null) {
    alert("NO ORDER PLEASE SELECT TABLE");
  }else{
      axios
        .put(`http://localhost:3001/order/${order}`, {
          status: "completed",
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      alert("Thank You");
      // messageApi.info("Created Order Successfully");
      }
  }
  clearOrder()
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
            <p>Total Price </p>
            <button type="button" onClick={checkOut}>Check Button</button>
        </div>
    );
}
export default TableSide;