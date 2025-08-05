import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import BillTypeSelector from './components/BillTypeSelector';
import BillInformation from './components/BillInformation';
import PeopleManager from './components/PeopleManager';
import ItemsManager from './components/ItemsManager';
import BillResults from './components/BillResults';
import './App.css';

const BillSplitter = () => {
  const [billType, setBillType] = useState('restaurant');
  const [totalAmount, setTotalAmount] = useState('');
  const [subtotalAmount, setSubtotalAmount] = useState('');
  const [taxAmount, setTaxAmount] = useState('');
  const [people, setPeople] = useState(['']);
  const [items, setItems] = useState([]);

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

  const addItem = (name, price) => {
    setItems([...items, {
      id: Date.now(),
      name,
      price: parseFloat(price),
      assignedTo: []
    }]);
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

  const validPeople = people.filter(person => person.trim() !== '');

  return (
    <div className="container">
      <div className="mainCard">
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
          <BillTypeSelector 
            billType={billType} 
            setBillType={setBillType} 
          />
          
          <BillInformation
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            subtotalAmount={subtotalAmount}
            setSubtotalAmount={setSubtotalAmount}
            taxAmount={taxAmount}
            setTaxAmount={setTaxAmount}
          />
          
          <PeopleManager
            people={people}
            validPeople={validPeople}
            addPerson={addPerson}
            updatePerson={updatePerson}
            removePerson={removePerson}
          />
          
          <ItemsManager
            items={items}
            validPeople={validPeople}
            addItem={addItem}
            removeItem={removeItem}
            togglePersonAssignment={togglePersonAssignment}
          />
          
          <BillResults
            items={items}
            validPeople={validPeople}
            calculateSplit={calculateSplit}
            taxRate={TAX_RATES[billType]}
            billType={billType}
          />
        </div>
      </div>
    </div>
  );
};

export default BillSplitter;