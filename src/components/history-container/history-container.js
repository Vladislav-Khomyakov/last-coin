import React, {Component} from 'react';
import withLastCoinServices from "../hoc/withLastCoinServices";
import {connect} from "react-redux";
import {fetchEventsAndCategories, fetchProfile, transactionRemoved} from "../../actions";
import Spinner from "../spinner";
import HistoryTransactions from "./history-transactions";

class HistoryContainer extends Component {
  state = {
    update: false
  };

  componentDidMount() {
    this.props.fetchProfile(1);
    this.props.fetchEventsAndCategories();
  };

  componentDidUpdate() {
    if (this.state.update === true) {
      setTimeout(() => this.props.fetchEventsAndCategories(), 2000);
      this.setState({update: false});
    }
  };

  onDelete = (eventsId) => {
    this.props.transactionRemoved(eventsId);
    this.setState({update: true});
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
    fetchProfile: fetchProfile(lastCoinServiceRequest, dispatch),
    transactionRemoved: (data) => dispatch(transactionRemoved(data))
  };
};

export default withLastCoinServices()(connect(mapStateToProps, mapDispatchToProps)(HistoryContainer));
