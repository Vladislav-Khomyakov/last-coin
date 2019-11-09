import React, {Component} from 'react';
import {connect} from "react-redux";
import './transaction-container.scss'
import withLastcoinService from "../hoc/withLastcoinService";
import {fetchEventsAndCategories, fetchProfile, transactionAdded, categoryAdded} from "../../actions";
import Spinner from "../spinner";
import TransactionInput from "../transaction-input";
import CategoryInput from "../category-input";

class TransactionsContainer extends Component {

  state = {
    transactionInput: {
      selectedCategory: -1,
      selectedTransactionType: "income",
      selectedAmount: 1,
      selectedDescription: ''
    },
    categoryInput: {
      selectedCategoryName: ""
    },
    update: false
  };

  componentDidMount() {
    this.props.fetchEventsAndCategories();
    this.props.fetchProfile(1);
  };

  componentDidUpdate() {
    if (this.state.update === true) {
      this.props.fetchEventsAndCategories();
      this.setState({update: false});
    }
  }

  handleChange = changeEvent => {
    const targetName = changeEvent.target.name;
    const targetValue = changeEvent.target.value;
    const newItem = {};

    if (Object.entries(this.state.transactionInput).some(([key]) => key === targetName)) {
      newItem[targetName] = (targetName === 'selectedCategory' || targetName === 'selectedAmount') ? Number(targetValue) : String(targetValue);
      this.setState({transactionInput: {...this.state.transactionInput, ...newItem}});
      setTimeout(() => console.log(this.state.transactionInput), 0);
    }

    if (Object.entries(this.state.categoryInput).some(([key]) => key === targetName)) {
      newItem[targetName] = String(targetValue);
      this.setState({categoryInput: {...this.state.categoryInput, ...newItem}});
      setTimeout(() => console.log(this.state.categoryInput), 0);
    }
  };

  onAddedTransaction = () => {
    const {profile: {rubCardCash}, transactionAdded} = this.props;
    const {selectedCategory, selectedTransactionType, selectedAmount} = this.state.transactionInput;

    if (selectedCategory === -1) {
      console.log('Выберите категорию')
    } else if ((rubCardCash < selectedAmount) && (selectedTransactionType === 'expense')) {
      console.log("На вашем кошельке недостаточно средств");
    } else {
      transactionAdded(this.state.transactionInput);
    }
  };

  onAddedCategory = () => {
    const {categoryAdded} = this.props;
    const {selectedCategoryName} = this.state.categoryInput;

    if (selectedCategoryName === "") {
      console.log('Введите название категории')
    } else {
      categoryAdded(this.state.categoryInput);
      this.setState({update: true});
    }
  };

  render() {
    const {loading, categories} = this.props;

    if (loading) {
      return <Spinner/>
    }

    return (
      <div className='transaction-container'>
        <TransactionInput
          categories={categories}
          state={this.state.transactionInput}
          handleChange={this.handleChange}
          onAddedTransaction={this.onAddedTransaction}/>

        <CategoryInput
          state={this.state.categoryInput}
          handleChange={this.handleChange}
          onAddedCategory={this.onAddedCategory}/>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories,
    profile: state.profile,
    loading: state.loading
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {lastcoinService} = ownProps;
  return {
    fetchEventsAndCategories: fetchEventsAndCategories(lastcoinService, dispatch),
    fetchProfile: fetchProfile(lastcoinService, dispatch),
    transactionAdded: (data) => dispatch(transactionAdded(data)),
    categoryAdded: (data) => dispatch(categoryAdded(data))
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(TransactionsContainer));
