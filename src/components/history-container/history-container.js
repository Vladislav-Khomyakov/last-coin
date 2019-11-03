import React, {Component} from 'react';
import withLastcoinService from "../hoc/withLastcoinService";
import {connect} from "react-redux";
import {fetchEventsAndCategories, transactionRemoved} from "../../actions";
import Spinner from "../spinner";
import HistoryTransactions from "../history-transactions";

class HistoryContainer extends Component {
  state = {
    update: false
  };

  componentDidMount() {
    this.props.fetchEventsAndCategories();
  };

  componentDidUpdate() {
    if (this.state.update === true) {
      setTimeout(() => this.props.fetchEventsAndCategories(), 1);
      this.setState({update: false});
    }
  };

  onDelete = (eventsId) => {
    const {transactionRemoved} = this.props;
    transactionRemoved(eventsId);
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

const mapDispatchToProps = (dispatch, {lastcoinService}) => {
  return {
    fetchEventsAndCategories: fetchEventsAndCategories(lastcoinService, dispatch),
    transactionRemoved: (data) => dispatch(transactionRemoved(data))
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(HistoryContainer));
