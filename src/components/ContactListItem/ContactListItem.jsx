import React from 'react';
import css from './ContactListItem.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const ContactListItem = ({ filteredContact, deleteContact }) => {
  const handleDelete = async () => {
    try {
      await deleteContact(filteredContact.id); // Assuming deleteContact now returns a promise
      Notify.success(
        `${filteredContact.name} was successfully deleted from your contacts!`,
        { position: 'center-top' }
      );
    } catch (error) {
      Notify.failure(
        `Failed to delete ${filteredContact.name}: ${error.message}`,
        { position: 'center-top' }
      );
    }
  };

  return (
    <li className={css.contactListItem}>
      <p>{filteredContact.name}:</p>
      <p className={css.contactAlign}>{filteredContact.number}</p>
      <button className={css.btnDelete} onClick={handleDelete}>
        Delete
      </button>
    </li>
  );
};
