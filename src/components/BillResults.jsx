import React from 'react';
import PersonCard from './PersonCard';
import './BillResults.css';


const BillResults = ({ items, validPeople, calculateSplit, taxRate, billType }) => {
  if (items.length === 0 || validPeople.length === 0) {
    return null;
  }

  const split = calculateSplit();
  const totalSubtotal = split.reduce((sum, person) => sum + person.subtotal, 0);
  const totalTax = split.reduce((sum, person) => sum + person.tax, 0);
  const grandTotal = totalSubtotal + totalTax;

  return (
    <div className="resultsSection">
      <h2 className="resultsTitle">Bill Split Results</h2>
      
      <div className="resultsGrid">
        {split.map((person, index) => (
          <PersonCard
            key={index}
            person={person}
            taxRate={taxRate}
            billType={billType}
          />
        ))}
      </div>

      {/* Grand Total */}
      <div className="summaryCard">
        <h3 className="summaryTitle">Bill Summary</h3>
        <div className="summaryDetails">
          <span>Subtotal: ${totalSubtotal.toFixed(2)} | </span>
          <span>Tax: ${totalTax.toFixed(2)} | </span>
          <span className="summaryTotal">Total: ${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BillResults;