import React, { useState } from "react";
import "./styles.css";
import json from "./Data.json";
import { addNode, deleteNode } from "./utils";
import List from './components/List';

export default function App() {
  const [data, setData] = useState(json);
  
  const handleAdd = (folderId) => {
    const name = prompt("Enter name:");
    const isFolder = window.confirm("Is it a folder?");
    if (!name) return;

    const newNode = {
      id: Date.now(),
      name,
      isFolder,
      ...(isFolder ? { children: [] } : {}),
    };

    setData((prev) => addNode(prev, folderId, newNode));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      setData((prev) => deleteNode(prev, id));
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1>File Explorer</h1>
      </div>
      <div className="file-explorer">
        <List list={data} handleAdd={handleAdd} handleDelete={handleDelete} />
      </div>
    </div>
  );
}
