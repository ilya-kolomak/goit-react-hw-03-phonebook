/* eslint-disable no-lone-blocks */
import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { nanoid } from 'nanoid';
import './App.css';
import ContactForm from '../ContactForm';
import ContactsList from '../ContactsList';
import Filter from '../Filter';

class App extends Component {
  state = {
    contacts: [
      { id: nanoid(10), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(10), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(10), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(10), name: 'Annie Copeland', number: '227-91-26' },
    ],

    filter: '',
  };

  addContacts = data => {
    const contactNew = {
      id: nanoid(10),
      name: data.name,
      number: data.number,
    };
    const findNameIndex = this.state.contacts.findIndex(
      contact => contact.name === contactNew.name
    );

    if (findNameIndex < 0) {
      return this.setState(({ contacts }) => ({
        contacts: [contactNew, ...contacts],
      }));
    }
    return alert(`${contactNew.name} is already in contacts`);
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  setContacts = () => {
    this.setState({ contacts: this.formSubmitHandler });
  };

  getSavedNames = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState(prevState => ({
        contacts: (prevState.contacts = parsedContacts),
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const { filter } = this.state;

    const filteredName = this.getSavedNames();
    return (
      <div className="Container">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContacts} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactsList
          contacts={filteredName}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  Filter: PropTypes.string,
  addContacts: PropTypes.func,
  deleteContact: PropTypes.func,
  changeFilter: PropTypes.func,
};