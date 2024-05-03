import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import css from './ContactList.module.css';
import { deleteContact } from '../PhonebookRedux/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const { items, filter, isLoading, error } = useSelector(
    state => state.contacts
  );

  // Filtering contacts based on the input from the filter state
  const filteredContacts = items.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Handler for deleting a contact
  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  if (isLoading) return <p>Loading contacts...</p>;
  if (error) return <p>Error loading contacts: {error}</p>;

  return (
    <ul className={css.ulBox}>
      {filteredContacts.length > 0 ? (
        filteredContacts.map(contact => (
          <ContactListItem
            key={contact.id}
            contact={contact}
            onDelete={() => handleDelete(contact.id)}
          />
        ))
      ) : (
        <p>No contacts found.</p>
      )}
    </ul>
  );
};
