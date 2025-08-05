import React from 'react';
import './PersonCard.css';

const PersonCard = ({ person, taxRate, billType }) => {
  return (
    <div className="personCard">
      <h3 className="personName">{person.name}</h3>
      <div className="itemList">
        {person.items.map((item, itemIndex) => (
          <div key={itemIndex} className="itemRow">
            <div className="itemDetails">
              <span className="itemName">{item.name}</span>
              {item.taxType && item.taxType !== billType && (
                <span className="taxTypeBadge">
                  {item.taxType === 'restaurant' ? 'Restaurant Tax' : 
                   item.taxType === 'grocery' ? 'Grocery Tax' : 
                   item.taxType === 'appliance' ? 'Appliance Tax' : 
                   `${item.taxType} Tax`}
                </span>
              )}
            </div>
            <div className="itemPricing">
              <span className="itemPrice">${item.price.toFixed(2)}</span>
              {item.tax && (
                <span className="itemTax">+${item.tax.toFixed(2)} tax</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="totalsSection">
        <div className="totalRow">
          <span>Subtotal:</span>
          <span>${person.subtotal.toFixed(2)}</span>
        </div>
        <div className="totalRow taxRow">
          <span>Total Tax:</span>
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