import React from 'react';
import { Trash2 } from 'lucide-react';
import './ItemCard.css';

const ItemCard = ({ item, validPeople, removeItem, togglePersonAssignment }) => {
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