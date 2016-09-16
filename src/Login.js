import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const containerSyle = {
  textAlign: 'center',
  display: 'inline-block',
  padding: '10',
  width: '600px',
};

const textBoxStyle = {
  width: 256,
  height: 72,
  fontSize: 16,
};

const buttonStyle = {
  margin: 24
}

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Paper style={containerSyle} zDepth={2}>
          <TextField  hintText="Enter Login" floatingLabelText="Login" style={textBoxStyle}/>
          <br/>
          <TextField  hintText="Enter Password" floatingLabelText="Password" style={textBoxStyle} type="password"/>
          <br/>
          <RaisedButton label="Login" style={buttonStyle} />
        </Paper>
      </div>
    );
  }
}


