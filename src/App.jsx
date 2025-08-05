import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calculator, Users, Receipt } from 'lucide-react';
import './App.css';

const BillSplitter = () => {
  const [billType, setBillType] = useState('restaurant');
  const [totalAmount, setTotalAmount] = useState('');
  const [subtotalAmount, setSubtotalAmount] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [people, setPeople] = useState(['']);
  const [items, setItems] = useState([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');

  // Chicago tax rates
  const TAX_RATES = {
    restaurant: 0.1075,
    grocery: 0.025
  };

  const addPerson = () => {
    setPeople([...people, '']);
  };

  const updatePerson = (index, name) => {
    const newPeople = [...people];
    newPeople[index] = name;
    setPeople(newPeople);
  };

  const removePerson = (index) => {
    if (people.length > 1) {
      const newPeople = people.filter((_, i) => i !== index);
      setPeople(newPeople);
      // Update items to remove references to deleted person
      setItems(items.map(item => ({
        ...item,
        assignedTo: item.assignedTo.filter(personIndex => 
          personIndex < index ? true : personIndex > index ? personIndex - 1 : false
        )
      })));
    }
  };

  const addItem = () => {
    if (newItemName && newItemPrice) {
      setItems([...items, {
        id: Date.now(),
        name: newItemName,
        price: parseFloat(newItemPrice),
        assignedTo: []
      }]);
      setNewItemName('');
      setNewItemPrice('');
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const togglePersonAssignment = (itemId, personIndex) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        const isAssigned = item.assignedTo.includes(personIndex);
        return {
          ...item,
          assignedTo: isAssigned 
            ? item.assignedTo.filter(p => p !== personIndex)
            : [...item.assignedTo, personIndex]
        };
      }
      return item;
    }));
  };

  const calculateSplit = () => {
    const validPeople = people.filter(person => person.trim() !== '');
    const results = validPeople.map((person, index) => ({
      name: person,
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0
    }));

    // Calculate each person's share of items
    items.forEach(item => {
      if (item.assignedTo.length > 0) {
        const pricePerPerson = item.price / item.assignedTo.length;
        item.assignedTo.forEach(personIndex => {
          if (personIndex < results.length) {
            results[personIndex].items.push({
              name: item.name,
              price: pricePerPerson
            });
            results[personIndex].subtotal += pricePerPerson;
          }
        });
      }
    });

    // Calculate tax and total for each person
    results.forEach(person => {
      person.tax = person.subtotal * TAX_RATES[billType];
      person.total = person.subtotal + person.tax;
    });

    return results;
  };

  const getCalculatedTotals = () => {
    const split = calculateSplit();
    const totalSubtotal = split.reduce((sum, person) => sum + person.subtotal, 0);
    const totalTax = split.reduce((sum, person) => sum + person.tax, 0);
    const grandTotal = totalSubtotal + totalTax;
    
    return { totalSubtotal, totalTax, grandTotal };
  };

  const validPeople = people.filter(person => person.trim() !== '');
  const split = calculateSplit();
  const { totalSubtotal, totalTax, grandTotal } = getCalculatedTotals();

  return (
    <div className="container">
      <div className="mainCard">
        {/* Header */}
        <div className="header">
          <div className="headerContent">
            <Calculator size={32} />
            <div>
              <h1 className="headerTitle">Chicago Bill Splitter</h1>
              <p className="headerSubtitle">Split bills with accurate Chicago tax rates</p>
            </div>
          </div>
        </div>

        <div className="content">
          {/* Bill Type Toggle */}
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

          {/* Bill Total Input */}
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

          {/* People Management */}
          <div className="section">
            <h2 className="sectionTitle">
              <Users size={20} />
              People ({validPeople.length})
            </h2>
            <div style={{marginBottom: '1rem'}}>
              {people.map((person, index) => (
                <div key={index} className="flexRow">
                  <input
                    type="text"
                    value={person}
                    onChange={(e) => updatePerson(index, e.target.value)}
                    className="input flexGrow"
                    placeholder={`Person ${index + 1} name`}
                  />
                  {people.length > 1 && (
                    <button
                      onClick={() => removePerson(index)}
                      className="iconButton deleteButton"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addPerson}
              className="button addButton"
            >
              <Plus size={16} />
              Add Person
            </button>
          </div>

          {/* Items Management */}
          <div className="section">
            <h2 className="sectionTitle">Items</h2>
            
            {/* Add New Item */}
            <div className="flexRow" style={{marginBottom: '1rem'}}>
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
                className="input"
                style={{width: '8rem'}}
                placeholder="Price"
              />
              <button
                onClick={addItem}
                className="button buttonPrimary"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Items List */}
            <div>
              {items.map((item) => (
                <div key={item.id} className="itemCard">
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
              ))}
            </div>
          </div>

          {/* Results */}
          {items.length > 0 && validPeople.length > 0 && (
            <div className="resultsSection">
              <h2 className="resultsTitle">Bill Split Results</h2>
              
              <div className="resultsGrid">
                {split.map((person, index) => (
                  <div key={index} className="personCard">
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
                      <div className="totalRow" style={{fontSize: '0.875rem', color: '#6b7280'}}>
                        <span>Tax ({(TAX_RATES[billType] * 100).toFixed(2)}%):</span>
                        <span>${person.tax.toFixed(2)}</span>
                      </div>
                      <div className="grandTotal">
                        <span>Total:</span>
                        <span>${person.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grand Total */}
              <div className="summaryCard">
                <h3 style={{fontWeight: '600', marginBottom: '0.5rem'}}>Bill Summary</h3>
                <div style={{fontSize: '0.875rem'}}>
                  <span>Subtotal: ${totalSubtotal.toFixed(2)} | </span>
                  <span>Tax: ${totalTax.toFixed(2)} | </span>
                  <span style={{fontWeight: '600'}}>Total: ${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BillSplitter;