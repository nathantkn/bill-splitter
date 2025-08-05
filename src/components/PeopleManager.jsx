import React from 'react';
import { Users, Plus, Trash2 } from 'lucide-react';
import '../App.css';

const PeopleManager = ({
  people,
  validPeople,
  addPerson,
  updatePerson,
  removePerson
}) => {
  return (
    <div className="section">
      <h2 className="sectionTitle">
        <Users size={20} />
        People ({validPeople.length})
      </h2>
      <div className="peopleList">
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
  );
};

export default PeopleManager;