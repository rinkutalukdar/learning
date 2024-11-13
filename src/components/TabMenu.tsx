// src/components/TabMenu.js
import React, { useState } from "react";

const TabMenu = ({ onSelectCategory }) => {
  const categories = ["Indian", "American", "Chinese", "Italian"];
  const [activeTab, setActiveTab] = useState(categories[0]);

  const handleTabClick = (category) => {
    setActiveTab(category);
    onSelectCategory(category);
  };

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleTabClick(category)}
          style={{
            padding: "10px",
            margin: "5px",
            backgroundColor: activeTab === category ? "lightblue" : "white",
            border: "1px solid #ccc",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default TabMenu;
