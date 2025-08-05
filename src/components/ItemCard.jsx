import React from 'react';
import { Trash2 } from 'lucide-react';
import './ItemCard.css';

const ItemCard = ({ 
  item, 
  validPeople, 
  removeItem, 
  togglePersonAssignment, 
  updateItemTaxType, 
  taxRates 
}) => {
  const handleTaxTypeChange = (e) => {
    updateItemTaxType(item.id, e.target.value);
  };

  return (
    <div className="itemCard">
      <div className="itemHeader">
        <div>
          <h3 className="itemTitle">{item.name}</h3>
          <p className="itemPrice">${item.price.toFixed(2)}</p>
        </div>
        <button
          onClick={() => removeItem(item.id)}
          className="iconButton deleteButton"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {/* Tax Type Selector */}
      <div className="taxTypeSelector">
        <label htmlFor={`tax-type-${item.id}`} className="taxTypeLabel">
          Tax Type:
        </label>
        <select
          id={`tax-type-${item.id}`}
          value={item.taxType || 'restaurant'}
          onChange={handleTaxTypeChange}
          className="taxTypeSelect"
        >
          <option value="restaurant">Restaurant ({(taxRates.restaurant * 100).toFixed(2)}%)</option>
          <option value="grocery">Grocery ({(taxRates.grocery * 100).toFixed(2)}%)</option>
          <option value="appliance">Appliance ({(taxRates.appliance * 100).toFixed(2)}%)</option>
        </select>
      </div>
      
      <div className="tagContainer">
        {validPeople.map((person, personIndex) => (
          <button
            key={personIndex}
            onClick={() => togglePersonAssignment(item.id, personIndex)}
            className={`tag ${item.assignedTo.includes(personIndex) ? 'tagActive' : 'tagInactive'}`}
          >
            {person}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ItemCard;