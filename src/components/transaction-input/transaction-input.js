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
      <div className='transaction-input__category-input'>
        <span>Select a category:</span>
        <select name='selectedCategory' value={selectedCategory} onChange={handleChange}>
          <option value='-1'> </option>
          {categories.map(renderSelectItems)}
        </select>
      </div>
      <div>
        <span>Select transaction type</span>
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
      <div>
        <span>Enter amount</span>
        <input
          type="number"
          min="1"
          name='selectedAmount'
          value={selectedAmount}
          onChange={handleChange}/>
      </div>
      <div>
        <span>Enter a description</span>
        <input
          type="text"
          name='selectedDescription'
          value={selectedDescription}
          onChange={handleChange}/>
      </div>
      <div>
        <button onClick={() => onAddedTransaction()}>
          Add transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionInput;

/*
import React, {Component} from 'react';
import {connect} from 'react-redux';
import withLastcoinService from "../hoc/withLastcoinService";
import {transactionAdded, fetchEventsAndCategories, fetchProfile} from "../../actions";

class TransactionInput extends Component {

  state = {
    selectedCategory: undefined,
    selectedTransactionType: "income",
    selectedAmount: 1,
    selectedDescription: 'Description'
  };

  handleChange = changeEvent => {
    if (changeEvent.target.name === 'selectedCategory') {
      this.setState({selectedCategory: Number(changeEvent.target.value)})
    } else if (changeEvent.target.name === 'selectedTransactionType') {
      this.setState({selectedTransactionType: String(changeEvent.target.value)})
    } else if (changeEvent.target.name === 'selectedAmount') {
      this.setState({selectedAmount: String(changeEvent.target.value)})
    } else {
      this.setState({selectedDescription: String(changeEvent.target.value)})
    }
  };

  pushNewTransaction = () => {
    const {profile: {rubCardCash}, transactionAdded} = this.props;
    const {selectedCategory, selectedTransactionType, selectedAmount} = this.state;

    if (selectedCategory === undefined) {
      console.log('Выберите категорию')
    } else if ((rubCardCash < selectedAmount) && (selectedTransactionType === 'expense')) {
      console.log("На вашем кошельке недостаточно средств");
    } else {
      transactionAdded(this.state);
    }
  };

  componentDidMount() {
    this.props.fetchEventsAndCategories();
    this.props.fetchProfile(1);
  };

  render() {
    const {categories} = this.props;
    const {selectedCategory, selectedTransactionType, selectedAmount, selectedDescription} = this.state;

    const renderSelectItems = (categories) => {
      const {id: categoryId, name} = categories;
      return (
        <option value={categoryId} key={categoryId}>{name} {categoryId}</option>
      );
    };

    return (
      <div>
        <div>
          <span>Select a category</span>
          <select name='selectedCategory' value={selectedCategory} onChange={this.handleChange}>
            {categories.map(renderSelectItems)}
          </select>
        </div>
        <div>
          <span>Select transaction type</span>
          <form>
            <p>
              <input
                type="radio"
                name='selectedTransactionType'
                value='income'
                checked={selectedTransactionType === 'income'}
                onChange={this.handleChange}/>
              Income
            </p>
            <p>
              <input
                type="radio"
                name='selectedTransactionType'
                value='expense'
                checked={selectedTransactionType === 'expense'}
                onChange={this.handleChange}/>
              Expense
            </p>
          </form>
        </div>
        <div>
          <span>Enter amount</span>
          <input
            type="number"
            min="1"
            name='selectedAmount'
            value={selectedAmount}
            onChange={this.handleChange}/>
        </div>
        <div>
          <span>Enter a description</span>
          <input
            type="text"
            name='selectedDescription'
            value={selectedDescription}
            onChange={this.handleChange}/>
        </div>
        <div>
          <button onClick={() => this.pushNewTransaction()}>
            Add transaction
          </button>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {lastcoinService} = ownProps;
  return {
    fetchEventsAndCategories: fetchEventsAndCategories(lastcoinService, dispatch),
    fetchProfile: fetchProfile(lastcoinService, dispatch),
    transactionAdded: (data) => dispatch(transactionAdded(data))
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(TransactionInput));
*/
