import React, {Component} from 'react';
import {connect} from "react-redux";
import withLastcoinService from "../hoc/withLastcoinService";
import {fetchEventsAndCategories, fetchProfile, transactionAdded} from "../../actions";
import Spinner from "../spinner";
import TransactionInput from "../transaction-input";

class TransactionsContainer extends Component {
  state = {
    selectedCategory: undefined,
    selectedTransactionType: "income",
    selectedAmount: 1,
    selectedDescription: 'Description'
  };

  handleChange = changeEvent => {
    const targetName = changeEvent.target.name;
    const targetValue = changeEvent.target.value;
    const selectedEvent = {};

    if (Object.entries(this.state).some(([key]) => key === targetName)) {
      selectedEvent[targetName] = (targetName === 'selectedCategory' || targetName === 'selectedAmount') ? Number(targetValue) : String(targetValue);
      this.setState(selectedEvent);
      setTimeout(() => console.log(this.state), 0);
    }
  };

  onAddedTransaction = () => {
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
    const {loading, categories} = this.props;

    if (loading) {
      return <Spinner/>
    }

    return (
      <TransactionInput
        categories={categories}
        state={this.state}
        handleChange={this.handleChange}
        onAddedTransaction={this.onAddedTransaction}/>
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
    transactionAdded: (data) => dispatch(transactionAdded(data))
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(TransactionsContainer));
