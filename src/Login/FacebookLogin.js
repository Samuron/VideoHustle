import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

export default class FacebookLogin extends Component {

  componentDidMount() {
    const { appId } = this.props;

    window.fbAsyncInit = () => {
      window.FB.init({
        appId: appId,
        xfbml: true,
        version: 'v2.7'
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  responseApi(authResponse) {
    window.FB.api('/me', {fields: this.props.fields}, (me) => {
      Object.assign(me, authResponse);
      this.props.onSuccess(me);
    });
  }

  checkLoginState(response) {
    if (response.authResponse) {
      this.responseApi(response.authResponse);
    } else {
      if (this.props.onError) {
        this.props.onError({status: response.status});
      }
    }
  }

  onClick() {
    const { scope } = this.props;
    window.FB.login(this.checkLoginState.bind(this), {scope});
  }

  render() {
    return (
      <RaisedButton
        label='Log in with facebook'
        primary={true}
        onClick={() => this.onClick()}/>
    )
  }
}
