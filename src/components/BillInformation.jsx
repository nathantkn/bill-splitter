import React from 'react';
import '../App.css';

const BillInformation = ({
  totalAmount,
  setTotalAmount,
  subtotalAmount,
  setSubtotalAmount,
  taxAmount,
  setTaxAmount
}) => {
  return (
    <div className="section">
      <h2 className="sectionTitle">Bill Information</h2>
      <div className="inputGrid">
        <div className="inputGroup">
          <label className="label">Total Amount</label>
          <input
            type="number"
            step="0.01"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            className="input"
            placeholder="0.00"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Subtotal (Optional)</label>
          <input
            type="number"
            step="0.01"
            value={subtotalAmount}
            onChange={(e) => setSubtotalAmount(e.target.value)}
            className="input"
            placeholder="0.00"
          />
        </div>
        <div className="inputGroup">
          <label className="label">Tax Amount (Optional)</label>
          <input
            type="number"
            step="0.01"
            value={taxAmount}
            onChange={(e) => setTaxAmount(e.target.value)}
            className="input"
            placeholder="0.00"
          />
        </div>
      </div>
    </div>
  );
};

export default BillInformation;