import React, {Component} from 'react';
import {connect} from 'react-redux';
import './overview-transactions.scss';
import withLastcoinService from "../hoc/withLastcoinService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {categoriesLoaded, eventsLoaded} from "../../actions";

class OverviewTransactions extends Component {

  componentDidMount() {
    const {lastcoinService} = this.props;
    lastcoinService.getPersonEvents()
      .then(data => this.props.eventsLoaded(data));
  }

  render() {
    const {events} = this.props;
    const renderRow = (events, idx) => {
      const {id, type, category, amount, walletType, date, description} = events;
      // let categoryName;
      // let i = 1;
      // while (category !== categories.id) {
      //   categoryName = categories.name
      // }
      return (
        <tr key={id}>
          <td>{idx + 1}</td>
          <td>{type}</td>
          <td>{category}</td>
          <td>{amount}</td>
          <td>{walletType}</td>
          <td>{date}</td>
          <td>{description}</td>
          <button>
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </tr>
      );
    };

    return (
      <div>
        <h2>Overview your transactions</h2>
        <table >
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
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
    categories: state.categories
  }
};

const mapDispatchToProps = {
  eventsLoaded: eventsLoaded,
  categoriesLoaded: categoriesLoaded
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(OverviewTransactions));
