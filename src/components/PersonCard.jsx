import React from 'react';
import './PersonCard.css';

const PersonCard = ({ person, taxRate, billType }) => {
  return (
    <div className="personCard">
      <h3 className="personName">{person.name}</h3>
      <div className="itemList">
        {person.items.map((item, itemIndex) => (
          <div key={itemIndex} className="itemRow">
            <span>{item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="totalsSection">
        <div className="totalRow">
          <span>Subtotal:</span>
          <span>${person.subtotal.toFixed(2)}</span>
        </div>
        <div className="totalRow taxRow">
          <span>Tax ({(taxRate * 100).toFixed(2)}%):</span>
          <span>${person.tax.toFixed(2)}</span>
        </div>
        <div className="grandTotal">
          <span>Total:</span>
          <span>${person.total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;