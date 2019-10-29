import React, {Component} from 'react';
import {connect} from 'react-redux';
import withLastcoinService from "../hoc/withLastcoinService";
import {historyEventsLoaded, cashAccountLoaded, transactionAdded} from "../../actions";

class TransactionInput extends Component {

  state = {
    selectedCategory: undefined,
    selectedTransactionType: "income",
    selectedAmount: 1,
    selectedDescription: 'Description'
  };

  categoryChange2 = (changeEvent) => {
    this.setState({selectedCategory: Number(changeEvent)});
  };

  categoryChange = changeEvent => {
    console.log(changeEvent.target.value);
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
    const {lastcoinService} = this.props;
    lastcoinService.getHistoryTransactions()
      .then((data) => {
        this.props.historyEventsLoaded(data);
      });
    lastcoinService.getPersonCashAccount(1)
      .then((data) => {
        this.props.cashAccountLoaded(data);
      });
  };

  render() {
    const {categories} = this.props;
    const {selectedCategory, selectedTransactionType, selectedAmount, selectedDescription} = this.state;

    const renderSelectItems = (categories, idx) => {
      const {id: categoryId, name} = categories;
      return (
        <option value={categoryId} key={categoryId}>{name} {categoryId}</option>
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

const mapDispatchToProps = {
  historyEventsLoaded: historyEventsLoaded,
  cashAccountLoaded: cashAccountLoaded,
  transactionAdded: transactionAdded
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(TransactionInput));
