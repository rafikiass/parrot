import React, { Component }  from 'react'


class RegisterAppForm extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            appName: '',
            appUrl: '',
            appDetails: {}
    };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state)
      }
    
      handleSubmit(event) {
        event.preventDefault();
        if(this.state.appName !== '' && this.state.appUrl !== ''){
            fetch("/registerApp", {
                method: 'post',
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json",
                }
              })
              .then(res => res.json())
              .then(appDetails => { 
                  this.setState({appDetails})
                  console.log(this.state.appDetails)
              }) 
              this.setState({appName: '', appUrl: ''})
              event.target.reset()
        }
      }
    
    render() {
        return (
            <div>
            {Object.keys(this.state.appDetails).length !== 0 && 
              <div>
               <p> <b> Registered App Name: </b> {this.state.appDetails.appName} </p>
               <p> <b> App URL: </b> {this.state.appDetails.appUrl} </p>
               <p> <b> App API Key(Keep Secure): </b> <span className="Api-Key"> {this.state.appDetails.apiKey} </span> </p>
               <hr/>
             </div>
            }    
            <form onSubmit={this.handleSubmit}>
                <label>Application Name: </label>
                <input name="appName" type="text" value={this.state.value} onChange={this.handleChange} /> <br/>
               
                <label> Application Url/End-point:  </label>
                 <input name="appUrl" type="text" value={this.state.value} onChange={this.handleChange} /> <br/>

                 <input className="Register-app-button" type="submit" value="Submit"/>
            </form>
            </div>
        )
    }
}

export default RegisterAppForm