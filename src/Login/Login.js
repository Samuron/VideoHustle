import React, { Component } from 'react';
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';

const FB_APP_ID = '1853871344834435';
const GOOGLE_APP_ID = '425237474960-ct1ci1v91oph5mrqkkhbgikgkj5lmk53.apps.googleusercontent.com';

const style = {
  textAlign: 'center',
  width: '500px',
  margin: '100px auto 0 auto',
  padding: '10px'
};

export default class Login extends Component {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  logIn(config) {
    window.localStorage.setItem('user', JSON.stringify(config));
    this.context.router.push('/');
  }

  onFBLogin({accessToken, expiresIn, name, id}) {
    this.logIn({
      token: accessToken,
      expires: expiresIn,
      name: name,
      id: id
    });
  }

  onGLogin({ tokenObj, profileObj }) {
    this.logIn({
      token: tokenObj.id_token,
      expires: tokenObj.expires_in,
      name: profileObj.name,
      id: profileObj.googleId
    });
  }


  onError( error ) {
    console.log( 'error:', error );
  }

  render() {
    return (
      <div style={style}>
        <h3>Hello %username%</h3>
        <FacebookLogin
          appId={FB_APP_ID}
          onSuccess={this.onFBLogin.bind(this)}
          onError={this.onError}
        />
        <GoogleLogin
          style={{float: 'right'}}
          appId={GOOGLE_APP_ID}
          onSuccess={this.onGLogin.bind(this)}
          onError={this.onError}
        />
      </div>
    )
  }
};
