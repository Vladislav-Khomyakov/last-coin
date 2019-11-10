import React from 'react';
import './transaction-input.scss';

const TransactionInput = ({categories, state, handleChange, onAddedTransaction}) => {
  const {selectedCategory, selectedTransactionType, selectedAmount, selectedDescription} = state;

  const renderSelectItems = (categories) => {
    const {id: categoryId, name} = categories;
    return (
      <option value={categoryId} key={categoryId}>{name}</option>
    );
  };

  return (
    <div className='transaction-input'>
      <div className='transaction-input__wrapper'>
        <div className='transaction-input__selection-section'>
          <span className='transaction-input__title'>Select a category</span>
          <select name='selectedCategory' value={selectedCategory} onChange={handleChange}>
            <option value='-1'> </option>
            {categories.map(renderSelectItems)}
          </select>
        </div>
        <div className='transaction-input__selection-section'>
          <span className='transaction-input__title'>Select transaction type</span>
          <form>
            <p>
              <input
                type="radio"
                name='selectedTransactionType'
                value='income'
                checked={selectedTransactionType === 'income'}
                onChange={handleChange}/>
              Income
            </p>
            <p>
              <input
                type="radio"
                name='selectedTransactionType'
                value='expense'
                checked={selectedTransactionType === 'expense'}
                onChange={handleChange}/>
              Expense
            </p>
          </form>
        </div>
        <div className='transaction-input__selection-section'>
          <span className='transaction-input__title'>Enter amount</span>
          <input
            type="number"
            min="1"
            name='selectedAmount'
            value={selectedAmount}
            onChange={handleChange}/>
        </div>
        <div className='transaction-input__selection-section'>
          <span className='transaction-input__title'>Enter a description</span>
          <input
            type="text"
            name='selectedDescription'
            value={selectedDescription}
            onChange={handleChange}/>
        </div>
        <div className='transaction-input__selection-section'>
          <button onClick={() => onAddedTransaction()} className='transaction-input__add-transaction-button'>
            Add transaction
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionInput;
