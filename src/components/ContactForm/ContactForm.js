import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './ContactForm.css';
import { nanoid } from 'nanoid';
class Form extends Component {
  state = {
    name: '',
    number: '',
  };
  nameInputId = nanoid(10);
  numberInputId = nanoid(10);

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="ContactsForm">
        <label htmlFor={this.nameInputId}>
          Name{' '}
          <input
            className="ContactsInput"
            type="text"
            name="name"
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
            id={this.nameInputId}
          />
        </label>

        <label htmlFor={this.numberInputId}>
          Number
          <input
            className="ContactsInput"
            type="tel"
            name="number"
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
            id={this.numberInputId}
          />
        </label>

        <button type="submit" className="ContactsBtn">
          Add contact
        </button>
      </form>
    );
  }
}

export default Form;

Form.propType = {
  name: PropTypes.string,
  number: PropTypes.string,
  handelSubmit: PropTypes.func,
  numberInputId: PropTypes.string,
};
