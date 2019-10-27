import React, {Component} from 'react';
import {connect} from 'react-redux';
import withLastcoinService from "../hoc/withLastcoinService";
import {overviewEventsLoaded, transactionAdded} from "../../actions";

class TransactionInput extends Component {

  state ={
    selectedCategory: 1,
    selectedTransactionType: "income",
    selectedAmount: 1,
    selectedDescription: 'Description'
  };

  categoryChange = changeEvent => {
    this.setState({selectedCategory: Number(changeEvent.target.value)});
  };

  transactionTypeChange = changeEvent => {
    this.setState({selectedTransactionType: String(changeEvent.target.value)});
  };

  amountChange = changeEvent => {
    this.setState({selectedAmount: Number(changeEvent.target.value)});
  };

  descriptionChange = changeEvent => {
    this.setState({selectedDescription: String(changeEvent.target.value)});
  };



  componentDidMount() {
    const {lastcoinService} = this.props;
    lastcoinService.getOverviewTransactions()
      .then((data) => {
        this.props.overviewEventsLoaded(data);
      });
  };

  render() {
    const {categories, transactionAdded} = this.props;
    const {selectedCategory, selectedTransactionType, selectedAmount, selectedDescription} = this.state;

    const renderSelectItems = (categories, idx) => {
      const {id: categoryId, name} = categories;
      console.log('row');
      return (
        <option value={categoryId} key={categoryId}>{name}</option>
      );
    };

    return (
      <div>
        <div>
          <span>Select a category</span>
          <select value={selectedCategory} onChange={this.categoryChange}>
            {categories.map(renderSelectItems)}
          </select>
        </div>
        <div>
          <span>Select transaction type</span>
          <form>
            <p>
              <input
                type="radio"
                value='income'
                checked={selectedTransactionType === 'income'}
                onChange={this.transactionTypeChange}/>
                Income
            </p>
            <p>
              <input
                type="radio"
                value='expense'
                checked={selectedTransactionType === 'expense'}
                onChange={this.transactionTypeChange}/>
                Expense
            </p>
          </form>
        </div>
        <div>
          <span>Enter amount</span>
          <input
            type="number"
            min="1"
            value={selectedAmount}
            onChange={this.amountChange}/>
        </div>
        <div>
          <span>Enter a description</span>
          <input
            type="text"
            value={selectedDescription}
            onChange={this.descriptionChange}/>
        </div>
        <div>
          <button onClick={() => transactionAdded(this.state)}>
            Add transaction
          </button>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  };
};

const mapDispatchToProps = {
  overviewEventsLoaded: overviewEventsLoaded,
  transactionAdded: transactionAdded
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(TransactionInput));
