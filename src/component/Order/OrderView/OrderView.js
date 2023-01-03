import "./OrderView.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";

const OrderView = ({
  menuItems,
  setMenuItems,
  setMenuItemsCategory,
  setItemsSearchQuery,
  itemsSearchQuery,
  selectMenuItems,
  setSelectMenuItems,
  setTotalPrice,
  totalPrice,
  currentOrder,
}) => {
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleCategoryChange = (event, category) => {
    event.preventDefault();
    setMenuItemsCategory(category);
  };
  const handleSearchChange = (query) => {
    query.preventDefault();
    setItemsSearchQuery(query.target.value);
  };

  //This function handle the search by passing the search?q= parameter to backend which then in backend we will use the value of q where q stands for parameter to get the item we want.
  const handleSearch = (query) => {
    query.preventDefault();
    axios
      .get(`http://localhost:3001/menu_items/search?q=${itemsSearchQuery}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => {});
  };

  //This function handle the select menuitems.
  const handleSelectMenuItem = (selItem) => {
    // 1. Storing selItems to updatedItem
    const updatedItem = { ...selItem };
    // 2. find the index of an item of selectMenuItems that has the same id as
    // the passed argument (selItems) and store in existingItemIndex
    const existingItemIndex = selectMenuItems.findIndex(
      (item) => item.id === selItem.id
    );
    // 3. If existingItem is greater or equal to 0 it means that there is an item with the same id as selItem exist in selectMenuItems
    // 4. Because of that we know the item to increase the quantity and store it in updatedSelectMenuItems array.
    if (existingItemIndex >= 0) {
      updatedItem.quantity = selectMenuItems[existingItemIndex].quantity + 1;
      const updatedSelectMenuItems = [...selectMenuItems];
      updatedSelectMenuItems[existingItemIndex] = updatedItem;
      setSelectMenuItems(updatedSelectMenuItems);
      //5. If the quantity is less than 0 we set the initial quantity to 1 and add it to selectMenuItems.
    } else {
      updatedItem.quantity = 1;
      setSelectMenuItems([...selectMenuItems, updatedItem]);
    }
    //6. Update the total price if quantity is = 1 then the total is add up by the price * 1
    //After checking this function again, it does the same for both conditions. Well, i'll leave it as an easter-egg here.
    let total = totalPrice;
    if (updatedItem.quantity === 1) {
      total += updatedItem.price * updatedItem.quantity;
    } else {
      total += updatedItem.price * 1;
    }

    setTotalPrice(total);
  };
  let allMenuItems = menuItems.map((menuitem) => {
    return (
      <div
        key={menuitem.id}
        className="order-view-item-cont"
        onClick={() => handleSelectMenuItem(menuitem)}
      >
        <img
          className="order-view-menu-item"
          style={{ width: "200px" }}
          src={menuitem.img}
          alt={menuitem.name}
        />
        <h2>{menuitem.name}</h2>
        <h2>฿ {menuitem.price}</h2>
      </div>
    );
  });
  return (
    <div className={"order-view-grid"}>
      <div className="order-view-header-cont">
        <p id="view-header-menulabel">Menu Category </p>
      </div>
      <div className="order-view-search-cont">
        <form className="order-view-search-form">
          <div className="searchBar">
            <input
              id="searchQueryInput"
              type="text"
              name="searchQueryInput"
              placeholder={`Order#00${currentOrder}`}
              value={itemsSearchQuery}
              onChange={handleSearchChange}
            />
            <button
              id="searchQuerySubmit"
              type="submit"
              name="searchQuerySubmit"
              onClick={handleSearch}
            >
              <svg
                className="search-img"
                style={{
                  width: "24px",
                  height: "21px",
                  viewBox: "0 0 24 24",
                  color: "#fff",
                }}
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
                fill="#ffffff"
                stroke="#ffffff"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>search-solid</title>{" "}
                  <g id="Layer_2" data-name="Layer 2">
                    {" "}
                    <g id="invisible_box" data-name="invisible box">
                      {" "}
                    </g>{" "}
                    <g id="icons_Q2" data-name="icons Q2">
                      {" "}
                      <path d="M30.9,28.1a14.8,14.8,0,0,0,3-10.9A15.2,15.2,0,0,0,20.1,4a15,15,0,0,0-3,29.9,15.3,15.3,0,0,0,11-2.9L40.6,43.4a1.9,1.9,0,0,0,2.8,0h0a1.9,1.9,0,0,0,0-2.8ZM20.8,29.9A11,11,0,0,1,8.2,17.1a10.8,10.8,0,0,1,8.9-8.9A10.9,10.9,0,0,1,29.8,20.9,11.1,11.1,0,0,1,20.8,29.9Z"></path>{" "}
                    </g>{" "}
                  </g>{" "}
                </g>
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div
        className={
          isLoading ? "order-slide-horizon-loading" : "order-slide-horizon"
        }
      >
        {isLoading ? (
          <GridLoader
            color={"#ff2531"}
            loading={isLoading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          [allMenuItems]
        )}
      </div>

      <div className="order-view-category-cont">
        <div className="order-view-category">
          <button
            className="order-view-category-btn"
            id="category-food-btn"
            value="food"
            onClick={(event) => handleCategoryChange(event, "food")}
          >
            <img
              src="https://imgur.com/NiOAJEl.png"
              onClick={(event) => handleCategoryChange(event, "food")}
            ></img>
          </button>
          <button
            className="order-view-category-btn"
            id="category-bev-btn"
            value="beverage"
            onClick={(event) => handleCategoryChange(event, "beverage")}
          >
            <img
              src="https://imgur.com/lUiSYuO.png"
              onClick={(event) => handleCategoryChange(event, "beverage")}
            ></img>
          </button>

          <button
            className="order-view-category-btn"
            id="category-bev-btn"
            value="desert"
          >
            <img src="https://imgur.com/VfPhkvO.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
