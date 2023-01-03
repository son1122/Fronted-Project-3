import "./DashboardView.css";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DecompositionTreeGraph } from "@ant-design/graphs";
import axios from "axios";

const Menu = () => {
  const [select, setSelect] = useState();
  const [menuItem, setMenuitem] = useState(
    <option value="loading">Loading</option>
  );
  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  const [data, setData] = useState({
    value: {
      title: "Please Select Menu",
      items: {
        text: "Price",
        value: "100",
      },
    },
    children: [
      {
        value: {
          title: "Rice",
          items: {
            text: "gram",
            value: "100",
          },
        },
      },
    ],
  });
  const [config, setConfig] = useState({
    data,
    autoFit: true,
    // behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
    nodeCfg: {
      autoWidth: true,
    },
  });
  const handleChangeSelect = (e) => {
    setSelect(e.target.value);
  };
  const getData = () => {
    axios
      .get(`http://localhost:3001/dashboard/menu/${select}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((res) => {
        console.log(res.data);
        // setData(data.value.title= res.data.name)
        const newData = {
          value: {
            title: res.data[0].name,
            items: {
              text: "Price",
              value: "100",
            },
          },
          children: [
            {
              value: {
                title: "Rice",
                items: {
                  text: "gram",
                  value: "100",
                },
              },
            },
          ],
        };
        newData.value.title = res.data[0].name;
        newData.value.items.value = res.data[0].price;
        newData.children[0].value.title = res.data[0].Ingredients[0].name;
        newData.children[0].value.items.value =
          res.data[0].Ingredients[0].MenuItemIngredient.quantity;
        for (let i = 1; i < res.data[0].Ingredients.length; i++) {
          newData.children.push({
            value: {
              title: res.data[0].Ingredients[i].name,
              items: {
                text: "gram",
                value: res.data[0].Ingredients[i].MenuItemIngredient.quantity,
              },
            },
          });
        }

        setData(newData);
        setConfig({
          data,
          autoFit: true,
          //   nodeCfg: {
          //     title: {
          //       containerStyle: {
          //         fill: "#ff2531",
          //       },
          //     },
          //     autoWidth: true,
          //     style: {
          //       stroke: "#ff2531",
          //     },
          //     nodeStateStyles: {
          //       hover: {
          //         stroke: "green",
          //         lineWidth: "2px",
          //       },
          //     },
          //   },
          nodeCfg: {
            title: {
              containerStyle: {
                fill: "#ff2531",
              },
              style: {
                fill: "#000",
                fontSize: 12,
              },
            },
            nodeStateStyles: {
              hover: {
                stroke: "#000",
                lineWidth: 3,
              },
            },
          },
          behaviors: ["drag-canvas", "zoom-canvas", "drag-node"],
        });
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3001/dashboard/menuitem`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      })
      .then((resu) => {
        console.log(resu);
        let data = resu.data.map((name, index) => {
          console.log(name);
          return (
            <option value={name.id} key={index}>
              {name.name}
            </option>
          );
        });
        console.log(data);
        setMenuitem(data);
      });
    // getData()
  }, [select]);
  useEffect(() => {
    getData();
  }, [select]);
  return (
    <div className={"grid28"}>
      <div>
        <h1>Menu Ingredient View</h1>
        <select name="<menu>" id="menu" onChange={handleChangeSelect}>
          <option value="" selected disabled hidden>
            Choose Menu
          </option>
          {menuItem}
        </select>
      </div>
      <DecompositionTreeGraph {...config} />;
    </div>
  );
};
export default Menu;
