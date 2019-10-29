import React, {Component} from 'react';
import {connect} from 'react-redux';
import './history-transactions.scss';
import withLastcoinService from "../hoc/withLastcoinService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {historyEventsLoaded, transactionRemoved} from "../../actions";

class HistoryTransactions extends Component {

  componentDidMount() {
    const {lastcoinService} = this.props;
    lastcoinService.getHistoryTransactions()
      .then((data) => this.props.historyEventsLoaded(data));
  };

  componentDidUpdate(prevProps) {
    // if (this.props.events !== prevProps.events) {
    //   const {lastcoinService} = this.props;
    //   lastcoinService.getHistoryTransactions()
    //     .then((data) => this.props.historyEventsLoaded(data));
    // }
  };

  render() {
    const {events, categories, onDelete} = this.props;

    const renderRow = (events, idx) => {
      const {id: eventsId, type, category, amount, walletType, date, description} = events;
      const categoryName = () => {
        const categoryName = categories.find(categories => categories.id === category);
        return categoryName.name;
      };
      return (
        <tr key={eventsId}>
          <td>{idx + 1}</td>
          <td>{type}</td>
          <td>{categoryName()}</td>
          <td>{amount}</td>
          <td>{walletType}</td>
          <td>{date}</td>
          <td>{description}</td>
          <td>
            <button onClick={() => onDelete(eventsId)}>
              <FontAwesomeIcon icon={faTrash}/>
            </button>
          </td>
        </tr>
      );
    };

    return (
      <div>
        <h2>Overview history your transactions</h2>
        <table>
          <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Wallet type</th>
            <th>Data</th>
            <th>Description</th>
          </tr>
          </thead>
          <tbody>
          {events.map(renderRow)}
          </tbody>
        </table>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    events: state.events,
    categories: state.categories
  }
};

const mapDispatchToProps = {
  historyEventsLoaded: historyEventsLoaded,
  onDelete: transactionRemoved
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(HistoryTransactions));
