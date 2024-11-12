// src/components/ItemList.js (or ItemList.tsx)
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const ItemList = () => {
  const [newItem, setNewItem] = useState('');
  const items = useSelector((state) => state.items); // Ensure this is correct
  const dispatch = useDispatch();

  const addItem = () => {
    if (newItem.trim()) {
      dispatch({ type: 'ADD_ITEM', payload: newItem });
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    dispatch({ type: 'REMOVE_ITEM', payload: index });
  };

  return (
    <div>
      <h2>Item List</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items && items.map((item, index) => ( // Check if items is not undefined
          <li key={index}>
            {item} <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
