import React, {Component} from 'react';
import withLastcoinService from "../hoc/withLastcoinService";
import {connect} from "react-redux";
import {fetchEventsAndCategories, transactionRemoved} from "../../actions";
import Spinner from "../spinner";
import HistoryTransactions from "../history-transactions";

class HistoryContainer extends Component {
  componentDidMount() {
    this.props.fetchEventsAndCategories();
  };

  componentDidUpdate(prevProps) {
    // if (this.props.events !== prevProps.events) {
    //   const {lastcoinService} = this.props;
    //   lastcoinService.getEventsAndCategories()
    //     .then((data) => this.props.eventsAndCategoriesLoaded(data));
    // }
  };

  render() {
    const {events, categories, loading, onDelete} = this.props;

    if (loading) {
      return <Spinner/>
    }

    return (
      <HistoryTransactions
        events={events}
        categories={categories}
        onDelete={onDelete}/>
    )
  }
}

const mapStateToProps = ({events, categories, loading}) => {
  return {events, categories, loading};
};

const mapDispatchToProps = (dispatch, {lastcoinService}) => {
  return {
    fetchEventsAndCategories: fetchEventsAndCategories(lastcoinService, dispatch),
    onDelete: (data) => dispatch(transactionRemoved(data))
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(HistoryContainer));
