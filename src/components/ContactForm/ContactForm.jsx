import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../PhonebookRedux/contactsSlice'; // Adjust the path as necessary
import css from './ContactForm.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const error = useSelector(state => state.contacts.error);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => setName(e.target.value);
  const handleNumberChange = e => setNumber(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (!name.trim() || !number.trim()) {
      Notify.failure('Please fill in all fields.');
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      Notify.failure(`${name} is already in your contacts!`);
      return;
    }

    dispatch(addContact({ name: name.trim(), number: number.trim() }));
    Notify.success(`${name} is successfully added to your contacts!`);

    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.formField}>
        <p className={css.formLabel}>Name</p>
        <input
          type="text"
          name="name"
          required
          value={name}
          onChange={handleNameChange}
          disabled={isLoading}
        />
      </label>
      <label className={css.formField}>
        <p className={css.formLabel}>Number</p>
        <input
          type="tel"
          name="number"
          required
          value={number}
          onChange={handleNumberChange}
          disabled={isLoading}
        />
      </label>
      <button
        className={css.btnSubmit}
        type="submit"
        disabled={isLoading || !name || !number}
      >
        {isLoading ? 'Adding...' : 'Add Contact'}
      </button>
      {error && <p className={css.error}>{error}</p>}
    </form>
  );
};
