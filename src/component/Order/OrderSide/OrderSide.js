import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { isCompositeComponent } from "react-dom/test-utils";
import "./OrderSide.css";
import { isCursorAtEnd } from "@testing-library/user-event/dist/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalConfirm from "../../Modal/ModalConfirm.js";
const OrderSide = ({
  selectMenuItems,
  totalPrice,
  setTotalPrice,
  setSelectMenuItems,
  currentOrder,
}) => {
  const [allTable, setAllTable] = useState([]);
  const [selectTable, setSelectTable] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  //Lottie
  const lottieRef = useRef(null);
  useEffect(() => {
    axios
      .get(`https://backend-sei-project-3.cyclic.app/table`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })

      .then((res) => {
        setAllTable(res.data);
      })
      .catch((err) => {});
  }, []);

  //This function handle the decreasing menuitems in the OrderSide and remove it when it reached 0
  //1. If each of the selectedMenuItems matched the id passed in the argument and the quantity is more than 0
  // Decrease the quantity of the item by 1 and also decreate the total price by the item price
  //2. Then return it, if the condition is not met then return as it was.
  //3. then the updatedItems array is filtered only the item that have quantity more than 0
  //4. then we get the updatedItems and set the select menu item as updated item
  const handleDecRemItem = (id) => {
    const updatedItems = selectMenuItems
      .map((menuitem) => {
        if (menuitem.id === id && menuitem.quantity > 0) {
          setTotalPrice(totalPrice - menuitem.price);
          return { ...menuitem, quantity: menuitem.quantity - 1 };
        }
        return menuitem;
      })
      .filter((menuitem) => menuitem.quantity > 0);
    setSelectMenuItems(updatedItems);
  };

  let tableList = allTable.map((table) => {
    return (
      <option key={table.id} value={table.table_number}>
        {table.table_number}
      </option>
    );
  });

  let selMenuItemList = selectMenuItems.map((item) => {
    return (
      <div key={item.id} className={"order-side-menu-grid"}>
        <img
          src={item.img}
          className={"order-side-menu-img"}
          style={{ maxheight: "50%" }}
        />
        <div className="order-side-menu-nameprice">
          <div className="order-side-menu-name">{item.name}</div>
          <div className="order-side-menu-price"> ฿ {item.price}</div>
        </div>
        <div className="order-side-menu-qtybtn">
          <div className="order-side-menu-qty">x {item.quantity}</div>
          <div className="order-side-menu-decbtn">
            <button id="decrement" onClick={() => handleDecRemItem(item.id)}>
              -
            </button>
          </div>
        </div>
      </div>
    );
  });
  const notiSuccess = () => {
    toast.success(`Created Order: ${currentOrder} Successfully`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notiFailed = () => {
    toast.error(
      `Failed to create Order: ${currentOrder} Please Select a table`,
      {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };
  const notiCancel = () => {
    toast.error(`Order: ${currentOrder} Cancelled`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //This confirmOrder function without anycondition it will do a post request of all the fields from the states, conditionals are for checking if the order is cancel and if the table is selected.
  let confirmOrder = () => {
    if (isFailed) {
      notiCancel();
    } else {
      const checkTable = () => {
        if (selectTable === null) {
          notiFailed();
        } else {
          axios
            .post(
              "https://backend-sei-project-3.cyclic.app/order",
              {
                menuItems: selectMenuItems,
                table_number: selectTable,
                customer_id: 3,
                order_date: new Date(),
                status: "inprogress",
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                },
              }
            )
            .then((res) => {})
            .catch((err) => {});
          notiSuccess();
          setSelectMenuItems([]);
        }
      };
      checkTable();
    }
  };
  return (
    <div className={"order-side-grid"}>
      <h2>Order#00{currentOrder}</h2>
      <div className={"order-side-detail-grid"}>
        <div className={"table-selection"}>
          <div className="custom-select">
            <select
              className="order-side-table-list"
              form="order-side-form"
              defaultValue={"defaultselect"}
              placeholder="Select Table"
              onChange={(e) => setSelectTable(e.target.value)}
            >
              <option disabled value={"defaultselect"}>
                Select Table
              </option>
              {tableList}
            </select>
          </div>
        </div>

        <div className="order-details-container">
          <div className="dont-delete-this-for-testing">Order's Summary</div>
        </div>
        <div className="order-side-slide">
          <div className={"order-side-detail-container"}>{selMenuItemList}</div>
        </div>
        <div className="price-cont">
          <div className="total-price-left">
            <p className="total-price-label-total" id="service">
              Service Charge (0%)
            </p>
            <p className="total-price-label-total" id="tax">
              Tax (0%)
            </p>
            <p className="total-price-label-total" id="total">
              Total
            </p>
          </div>
          <div className="total-price-right">
            <p className="total-price-label-total" id="service">
              0 Baht
            </p>
            <p className="total-price-label-total" id="tax">
              0 Baht
            </p>
            <p className="total-price-label-total" id="total">
              {totalPrice} Baht
            </p>
          </div>
        </div>
      </div>
      <div className="order-side-confirm-btn-cont">
        <ModalConfirm
          lottieRef={lottieRef}
          open={isModal}
          currentOrder={currentOrder}
          setIsModal={setIsModal}
          isModal={isModal}
          onClose={() => setIsModal(false)}
          confirmOrder={confirmOrder}
          setIsFailed={setIsFailed}
          isFailed={isFailed}
          selectTable={selectTable}
        ></ModalConfirm>
        <div
          className="order-side-confirm-btn"
          onClick={() => {
            setIsModal(true);
          }}
        >
          Confirm
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderSide;
