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
      <h2>Add Something</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Add a new item"
        className='w-full p-2 border rounded'
      />
      <button onClick={addItem} className="px-4 py-2 bg-blue-600 text-white rounded">Add Item</button>
      <ul role="list" className="divide-y divide-gray-100">
        
        {items && items.map((item, index) => ( // Check if items is not undefined
          <li className="flex justify-between gap-x-6 py-5" key={index}>
            {item} <button onClick={() => removeItem(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
