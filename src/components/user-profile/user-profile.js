import React, {Component} from "react";
import {connect} from 'react-redux';
import withLastcoinService from '../hoc/withLastcoinService';

class UserProfile extends Component {
  componentDidMount() {
    const {lastcoinService} = this.props;
    lastcoinService.getPersonCashAccount(1).then((data) => {
      //console.log('3', data);
      this.props.cashAccountLoaded(data);
    });
  };

  render() {
    const {firstName, lastName, email} = this.props.profile;

    return (
      <div>
        <h3>Здравствуйте, {firstName} {lastName}</h3>
        <span>Ваш Email: {email}</span>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cashAccountLoaded: (newProfile) => {
      dispatch({
        type: 'FETCH_CASH_ACCOUNT_SUCCESS',
        payload: newProfile
      })
    }
  };
};

export default withLastcoinService()(connect(mapStateToProps, mapDispatchToProps)(UserProfile));
