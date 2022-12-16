// import { render } from '@testing-library/react';
import React from 'react';
import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './SearchBar.module.css';

export const SearchBar = ({ onSubmit }) => {
  const [searchName, setSearchName] = useState('');

  const handleInputChange = event => {
    const newSearchName = event.currentTarget.value.toLowerCase();
    setSearchName(newSearchName);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchName.trim() === '') {
      toast.error('введите данные для поиска');
      return;
    }
    onSubmit(searchName);
    setSearchName('');
  };

  return (
    <div className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <input
          className={css.SearchFormInput}
          type="text"
          value={searchName}
          name="name"
          onChange={handleInputChange}
        />
        <button className={css.SearchFormButton} type="submit">
          <ImSearch />
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
