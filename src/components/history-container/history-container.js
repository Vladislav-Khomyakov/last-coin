import React, {Component} from 'react';
import withLastCoinServices from "../hoc/withLastCoinServices";
import {connect} from "react-redux";
import {fetchEventsAndCategories, fetchEventsAndCategoriesUpdate, fetchProfile, transactionRemoved} from "../../actions";
import Spinner from "../spinner";
import HistoryTransactions from "./history-transactions";

class HistoryContainer extends Component {
  componentDidMount() {
    this.props.fetchProfile(1);
    this.props.fetchEventsAndCategories();
  };

  onDelete = (eventsId) => {
    this.props.transactionRemoved(eventsId);
  };

  render() {
    const {events, categories, loading} = this.props;

    if (loading) {
      return <Spinner/>
    }

    return (
      <HistoryTransactions
        events={events}
        categories={categories}
        onDelete={this.onDelete}/>
    )
  }
}

const mapStateToProps = ({events, categories, loading}) => {
  return {events, categories, loading};
};

const mapDispatchToProps = (dispatch, {lastCoinServiceRequest}) => {
  return {
    fetchEventsAndCategories: fetchEventsAndCategories(lastCoinServiceRequest, dispatch),
    fetchEventsAndCategoriesUpdate: fetchEventsAndCategoriesUpdate(lastCoinServiceRequest, dispatch),
    fetchProfile: fetchProfile(lastCoinServiceRequest, dispatch),
    transactionRemoved: (data) => dispatch(transactionRemoved(data))
  };
};

export default withLastCoinServices()(connect(mapStateToProps, mapDispatchToProps)(HistoryContainer));
