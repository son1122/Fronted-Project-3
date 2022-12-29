import "./OrderView.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

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
}) => {
  const handleCategoryChange = (category) => {
    category.preventDefault();
    setMenuItemsCategory(category.target.value);
  };
  const handleSearchChange = (query) => {
    query.preventDefault();
    setItemsSearchQuery(query.target.value);
  };

  const handleSearch = (query) => {
    query.preventDefault();
    axios
      .get(`http://localhost:3001/menu_items/search?q=${itemsSearchQuery}`)
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSelectMenuItem = (selItem) => {
    const updatedItem = menuItems.find((item) => item.id === selItem.id);
    if (!updatedItem.quantity) {
      updatedItem.quantity = 1;
    } else {
      updatedItem.quantity += 1;
    }

    const checkDuplicate = selectMenuItems.find(
      (item) => item.id === selItem.id
    );

    if (checkDuplicate) {
      const updatedSelectedItems = selectMenuItems.map((item) => {
        if (item.id === selItem.id) {
          return updatedItem;
        }
        return item;
      });
      //FIXME:
      // For test Purpose FIXME
      setSelectMenuItems([...selectMenuItems, updatedSelectedItems]);
    } else {
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
      <div className="order-view-item-cont">
        <img
          key={menuitem.id}
          className="order-view-menu-item"
          style={{ width: "200px" }}
          src={menuitem.img}
          alt={menuitem.name}
          onClick={() => handleSelectMenuItem(menuitem)}
        />
        <h2>{menuitem.name}</h2>
        <h2>฿ {menuitem.price}</h2>
      </div>
    );
  });
  return (
    <div className={"order-view-grid"}>
      <h1 className="view-header">Order View</h1>
      <div className="order-view-search-cont">
        <form className="order-view-search-form">
          <div class="searchBar">
            <input
              id="searchQueryInput"
              type="text"
              name="searchQueryInput"
              placeholder="Search"
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
                style={{ width: "24px", height: "24px", viewBox: "0 0 24 24" }}
              >
                <path
                  fill="#666666"
                  d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      <div className={"order-slide-horizon"}>{allMenuItems}</div>
      <div className="order-view-category-cont">
        <div className="order-view-category">
          <button
            className="order-view-category-btn"
            id="category-food-btn"
            value="food"
            onClick={handleCategoryChange}
          >
            Food
          </button>
          <button
            className="order-view-category-btn"
            id="category-bev-btn"
            value="beverage"
            onClick={handleCategoryChange}
          >
            Beverages
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderView;
