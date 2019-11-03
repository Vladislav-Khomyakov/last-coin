import React from 'react';

const CategoryInput = ({state, handleChange, onAddedCategory}) => {
  const {selectedCategoryName} = state;

  return (
    <div>
      <div>
        <span>Enter a name</span>
        <input
          type="text"
          name='selectedCategoryName'
          value={selectedCategoryName}
          onChange={handleChange}/>
      </div>
      <div>
        <button onClick={() => onAddedCategory()}>
          Add category
        </button>
      </div>
    </div>
  );
};

export default CategoryInput;
