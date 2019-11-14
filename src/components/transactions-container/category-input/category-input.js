import React from 'react';
import './category-input.scss'

const CategoryInput = ({state, handleChange, onAddedCategory}) => {
  const {selectedCategoryName} = state;

  return (
    <div className='category-input'>
      <div className="category-input__wrapper">
        <h3 className='category-input__head-title'>
          Adding a new transaction and category
        </h3>
        <div className="category-input__selection-section">
          <span className='transaction-input__title'>Enter a name</span>
          <input
            type="text"
            name='selectedCategoryName'
            value={selectedCategoryName}
            onChange={handleChange}/>
        </div>
        <div className="category-input__selection-button">
          <button onClick={() => onAddedCategory()} className='category-input__add-category-button'>
            Add category
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryInput;
