import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class FacebookLogin extends Component {
  componentDidMount() {
    const { appId  } = this.props;
    ((d, s, id, cb) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      js = d.createElement(s);
      js.id = id;
      js.src = '//apis.google.com/js/client:platform.js';
      fjs.parentNode.insertBefore(js, fjs);
      js.onload = cb;
    })(document, 'script', 'google-login', () => {
      const params = {
        client_id: appId
      };
      window.gapi.load('auth2', () => {
        if (!window.gapi.auth2.getAuthInstance()) {
          window.gapi.auth2.init(params);
        }
      });
    });
  }

  onClick() {
    window.gapi.auth2
      .getAuthInstance()
      .signIn()
      .then(res => {
        const basicProfile = res.getBasicProfile();
        const authResponse = res.getAuthResponse();
        res.googleId = basicProfile.getId();
        res.tokenObj = authResponse;
        res.tokenId = authResponse.id_token;
        res.accessToken = authResponse.access_token;
        res.profileObj = {
          googleId: basicProfile.getId(),
          imageUrl: basicProfile.getImageUrl(),
          email: basicProfile.getEmail(),
          name: basicProfile.getName(),
          givenName: basicProfile.getGivenName(),
          familyName: basicProfile.getFamilyName()
        };
        this.props.onSuccess(res);
      }, err => this.props.onError(err));
  }

  render() {
    return (
      <RaisedButton
        label='Log in with Google'
        secondary={true}
        onClick={() => this.onClick()} />
    )
  }
}
