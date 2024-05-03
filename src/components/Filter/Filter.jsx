import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../PhonebookRedux/contactsSlice';
import css from './Filter.module.css';
import debounce from 'lodash/debounce';

export const Filter = () => {
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(filter);

  const debouncedSetFilter = debounce(value => {
    dispatch(setFilter(value));
  }, 300);

  useEffect(() => {
    debouncedSetFilter(inputValue);
    // Cleanup to prevent stale closures if component unmounts
    return () => debouncedSetFilter.cancel();
  }, [debouncedSetFilter, inputValue]);

  const handleFilterChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <div className={css.divFilter}>
      <p>Find Contacts by Name</p>
      <input
        type="text"
        name="filter"
        placeholder="Search by name"
        value={inputValue}
        onChange={handleFilterChange}
      />
    </div>
  );
};
