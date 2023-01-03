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

  const handleSearch = (query) => {
    query.preventDefault();
    axios
      .get(`https://backend-sei-project-3.cyclic.app/menu_items/search?q=${itemsSearchQuery}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => {});
  };

  const handleSelectMenuItem = (selItem) => {
    const updatedItem = { ...selItem };
    const existingItemIndex = selectMenuItems.findIndex(
      (item) => item.id === selItem.id
    );
    if (existingItemIndex >= 0) {
      updatedItem.quantity = selectMenuItems[existingItemIndex].quantity + 1;
      const updatedSelectMenuItems = [...selectMenuItems];
      updatedSelectMenuItems[existingItemIndex] = updatedItem;
      setSelectMenuItems(updatedSelectMenuItems);
    } else {
      updatedItem.quantity = 1;
      setSelectMenuItems([...selectMenuItems, updatedItem]);
    }
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
        {/* <p className="view-header">Order#00{currentOrder}</p> */}
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
            // onClick={handleCategoryChange}
          >
            <img src="https://imgur.com/VfPhkvO.png"></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
