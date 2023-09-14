import { useEffect, useState } from "react";
import Logo from "./logo";
import Form from "./From";
import PackingList from "./PackingList";
import Stats from "./Stats";

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// const cors = require("cors");
// const express = require("express");

// const app = express();
// const port = 5000;

// app.use(cors());

export default function App() {
  const [items, setItems] = useState([]);

  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();

    console.log("coming...");

    // Connect to the MongoDB database
    mongoose.connect("mongodb://mongodb:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "MongoDB connection error:"));
    db.once("open", () => {
      console.log("Connected to MongoDB");
    });

    // app.listen(3000, () => {
    //   console.log(`Server is running on port ${port}`);
    // });
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://swapi.dev/api/films");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function handleAddItems(item) {
    setItems((items) => [...items, item]);

    console.log(items);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => id !== item.id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      {console.log("movies =", data)}
      <Logo />
      <Form OnAddItems={handleAddItems} />
      <PackingList
        items={items}
        OnDeleteItem={handleDeleteItem}
        OnToggleItem={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
