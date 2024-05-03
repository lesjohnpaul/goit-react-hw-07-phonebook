import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import css from './ContactList.module.css';
import { deleteContact } from '../../PhonebookRedux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const { items, filter } = useSelector(state => state.contacts);
  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul className={css.ulBox}>
      {filteredContacts.map(filteredContact => (
        <ContactListItem
          key={filteredContact.id}
          filteredContact={filteredContact}
          deleteContact={() => handleDelete(filteredContact.id)}
        />
      ))}
    </ul>
  );
};
