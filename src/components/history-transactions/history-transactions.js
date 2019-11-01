import React from 'react';
import './history-transactions.scss';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const HistoryTransactions = ({events, categories, onDelete}) => {
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

export default HistoryTransactions;
