import "./OrderView.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderView = ({
  menuItems,
  setMenuItems,
  setMenuItemsCategory,
  setItemsSearchQuery,
  itemsSearchQuery,
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
    axios
      .get(`http://localhost:3001/menu_items/search?q=${itemsSearchQuery}`)
      .then((res) => {
        setMenuItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let allMenuItems = menuItems.map((menuitem) => {
    return (
      <img
        className="orderview-menu-item"
        style={{ width: "300px" }}
        src={menuitem.img}
        alt="menu-item"
      />
    );
  });
  return (
    <div className={"order-view-grid"}>
      <p>Order View</p>
      <div className="order-view-search-cont">
        <input
          className="order-view-searchbar"
          type="text"
          value={itemsSearchQuery}
          onChange={handleSearchChange}
        />
        <button className="order-view-search-btn" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className={"order-slide-horizon"}>{allMenuItems}</div>
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
          id="category-beverage-btn"
          value="beverage"
          onClick={handleCategoryChange}
        >
          Beverages
        </button>
      </div>
    </div>
  );
};

export default OrderView;
