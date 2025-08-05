import React from 'react';
import { Receipt } from 'lucide-react';
import '../App.css';

const BillTypeSelector = ({ billType, setBillType }) => {
  return (
    <div className="section">
      <h2 className="sectionTitle">
        <Receipt size={20} />
        Bill Type
      </h2>
      <div className="buttonGroup">
        <button
          onClick={() => setBillType('restaurant')}
          className={`button ${billType === 'restaurant' ? 'buttonPrimary' : 'buttonSecondary'}`}
        >
          Restaurant (10.75% tax)
        </button>
        <button
          onClick={() => setBillType('grocery')}
          className={`button ${billType === 'grocery' ? 'buttonPrimary' : 'buttonSecondary'}`}
        >
          Grocery (2.25% tax)
        </button>
      </div>
    </div>
  );
};

export default BillTypeSelector;