import "./OrderView.css";
const OrderView = ({ menuItems, setMenuItemsCategory }) => {
  const handleCategoryChange = (category) => {
    category.preventDefault();
    setMenuItemsCategory(category.target.value);
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
      <p>Search</p>
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
