import React, { useState } from "react";
import "../styles.css";

const List = ({ list, handleAdd, handleDelete }) => {

    const [isExpand, setIsExpand] = useState({});

    return list.map((l) => (
      <div key={l.id} className="files">
        {l.isFolder && (
          <span
            onClick={() => {
              setIsExpand((prev) => ({ ...prev, [l.id]: !prev[l.id] }));
            }}
          >
            {isExpand[l.id] ? "-" : "+"}
          </span>
        )}
        {l.isFolder ? "📁" : "📄"}
        {l.name}
        {l.isFolder &&
            <span onClick={() => handleAdd(l.id)} title="Add">
            ➕
            </span>
        }
        <span onClick={() => handleDelete(l.id)} title="Delete">
          ❌
        </span>
        {isExpand?.[l.id] && l.children && (
          <List
            list={l.children}
            handleAdd={handleAdd}
            handleDelete={handleDelete}
          />
        )}
      </div>
    ));
  };

  export default List;