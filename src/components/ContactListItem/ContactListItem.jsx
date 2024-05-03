import React from 'react';
import css from './ContactListItem.module.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const ContactListItem = ({ contact, onDelete }) => {
  const handleDelete = async () => {
    try {
      await onDelete(contact.id); // Assuming onDelete now returns a promise
      Notify.success(
        `${contact.name} was successfully deleted from your contacts!`,
        { position: 'center-top' }
      );
    } catch (error) {
      Notify.failure(`Failed to delete ${contact.name}: ${error.message}`, {
        position: 'center-top',
      });
    }
  };

  return (
    <li className={css.contactListItem}>
      <p>{contact.name}:</p>
      <p className={css.contactAlign}>{contact.number}</p>
      <button
        className={css.btnDelete}
        onClick={handleDelete}
        aria-label={`Delete ${contact.name}`}
      >
        Delete
      </button>
    </li>
  );
};
