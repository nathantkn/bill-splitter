import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import ItemCard from './ItemCard';
import './ItemsManager.css';

const ItemsManager = ({
  items,
  validPeople,
  addItem,
  removeItem,
  togglePersonAssignment,
  updateItemTaxType,
  taxRates
}) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  const handleAddItem = () => {
    if (newItemName && newItemPrice) {
      addItem(newItemName, newItemPrice);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  return (
    <div className="section">
      <h2 className="sectionTitle">Items</h2>
      
      {/* Add New Item */}
      <div className="addItemForm">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="input flexGrow"
          placeholder="Item name"
        />
        <input
          type="number"
          step="0.01"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(e.target.value)}
          className="input priceInput"
          placeholder="Price"
        />
        <button
          onClick={handleAddItem}
          className="button buttonPrimary"
        >
          <Plus size={16} />
        </button>
      </div>

      {/* Items List */}
      <div className="itemsList">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            validPeople={validPeople}
            removeItem={removeItem}
            togglePersonAssignment={togglePersonAssignment}
            updateItemTaxType={updateItemTaxType}
            taxRates={taxRates}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsManager;