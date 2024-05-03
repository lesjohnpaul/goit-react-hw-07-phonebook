import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import css from './Filter.module.css';
import { setFilter } from '../../PhonebookRedux/contactsSlice'; // Adjust the path as necessary

export const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  const handleFilterChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={css.divFilter}>
      <p>Find Contacts by Name</p>
      <input
        type="text"
        name="filter"
        placeholder="Search by name"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};
