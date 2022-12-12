import React from 'react';
import { PropTypes } from 'prop-types';
import { nanoid } from 'nanoid';
import './Contacts.css';
const ContactsList = ({ contacts, onDeleteContact }) => (
  <ul className="ContactList">
    {contacts.map(({ id, name, number }) => (
      <li key={nanoid(10)} className="ContactsItem">
        <p className="Info">{name}:</p>
        <p className="Info">{number}</p>
        <button className="DeleteBtn" onClick={() => onDeleteContact(id)}>
          Delete
        </button>
      </li>
    ))}
  </ul>
);

export default ContactsList;
ContactsList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  deleteContact: PropTypes.func,
};
