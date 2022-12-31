import "./TableSide.css"
import React, {useState, useEffect} from "react";
import axios from "axios";
import { forEach } from "lodash";



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

// Map orderdetail API 
  let tableOrderDetail = 0
try {
  tableOrderDetail = orderDetail.map(item =>{ 
  // use if to fillter orderdetail by order id
    if(item.order_id == order){

      // Get menu name by order detail 
      let menuDetail = 0
       
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
        {menuDetail[item.menu_item_id-1].name}
        {item.quantity}
        {menuDetail[item.menu_item_id-1].price}
      </div>
      )
    }else{return(
      <div></div>
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