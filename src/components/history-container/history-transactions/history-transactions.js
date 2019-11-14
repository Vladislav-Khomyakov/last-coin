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

    let tbodyItemClassName;
    if ((idx % 2) === 0) {
      tbodyItemClassName = 'history-transactions__row history-transactions__row_white';
    } else {
      tbodyItemClassName = 'history-transactions__row history-transactions__row_grey';
    }

    return (
      <tr key={eventsId} className={tbodyItemClassName}>
        <td>{idx + 1}</td>
        <td>{type}</td>
        <td>{categoryName()}</td>
        <td>{amount}</td>
        <td>{walletType}</td>
        <td>{date}</td>
        <td>{description}</td>
        <td>
          <button onClick={() => onDelete(eventsId)} className='history-transactions__del-button'>
            <FontAwesomeIcon icon={faTrash}/>
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className='history-transactions'>
      <h2 className='history-transactions__title'>
        Overview history your transactions
      </h2>
      <div className="history-transactions__table-wrapper">
        <h3 className='history-transactions__t-title'>
          Events list
        </h3>
        <div className="history-transactions__table-container">
          <table className='history-transactions__table'>
            <thead className='history-transactions__thead'>
            <tr className='history-transactions__row'>
              <th className='history-transactions__cell'>#</th>
              <th className='history-transactions__cell'>Type</th>
              <th className='history-transactions__cell'>Category</th>
              <th className='history-transactions__cell'>Amount</th>
              <th className='history-transactions__cell'>Wallet type</th>
              <th className='history-transactions__cell'>Data</th>
              <th className='history-transactions__cell'>Description</th>
              <th className='history-transactions__cell'>Action</th>
            </tr>
            </thead>
            <tbody className='history-transactions__tbody'>
            {events.map(renderRow)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HistoryTransactions;
