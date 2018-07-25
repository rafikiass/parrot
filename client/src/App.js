import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import RegisterAppForm from './RegisterAppForm'
import io from 'socket.io-client';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      showNotification: false,
      message: ""
    }
  }

  componentDidMount() {
    //Any js can listen to these events. this is just a demo.. does not have to be react.
    const socket = io('http://localhost:3001');
    socket.on('jdfconnected', data =>{
      console.log(data)
    });

    socket.on('Notification', message => {
      console.log(message)
      this.setState({
        showNotification: true,
        message
      })
    })


    socket.on('saveApp', message => {
      console.log(message)
      this.setState({
        showNotification: true,
        message
      })
    })
  }

  displayRegistrationForm() {
    this.setState({
      showForm: true
    })
  }


  render() {
    let renderValue
    if(this.state.showForm) {
      renderValue = <RegisterAppForm/>
    } else {
      renderValue = <button className="Register-app-button" onClick={() => this.displayRegistrationForm()}> Register your app </button>
    }
     
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Parrot, The JDF Notification System </h1>
        </header>
        {this.state.showNotification && 
          <div className="Notification-message"> {this.state.message} </div>
        }
        <div className="App-intro">
           {renderValue}
        </div>
      </div>
    );
  }
}

export default App;
