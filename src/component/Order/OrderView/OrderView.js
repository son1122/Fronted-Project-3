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
          style={{ width: "250px" }}
          src={menuitem.img}
          alt={menuitem.name}
          onClick={() => handleSelectMenuItem(menuitem)}
        />
        <h2>{menuitem.name}</h2>
      </div>
    );
  });
  return (
    <div className={"order-view-grid"}>
      <p>Order View</p>
      <div className="order-view-search-cont">
        <form className="order-view-search-form">
          <input
            type="text"
            class="search-textbox"
            placeholder="Search"
            value={itemsSearchQuery}
            onChange={handleSearchChange}
          />
          <input
            title="Search"
            value="⌕"
            type="submit"
            class="search-button"
            onClick={handleSearch}
          />
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
            id="button-31"
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
