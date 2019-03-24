import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId:
            '987265842657-c5osufnck7eou9k1vecv8ff4ir5jeb3f.apps.googleusercontent.com',
          scope: 'email'
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = isSignedIn => {
    if (isSignedIn) {
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSighInClick = () => {
    this.auth.signIn();
  };

  onSightOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button onClick={this.onSightOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    }
    return (
      <button onClick={this.onSighInClick} className="ui red google button">
        <i className="google icon" />
        Sign In with Google
      </button>
    );
  }
  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStateToProps = ({ auth: { isSignedIn } }) => ({
  isSignedIn
});
export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
