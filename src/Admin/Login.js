import React, { Component } from 'react';

import './admin.css';
import logo from '../img/logo.jpg';

export default class Login extends Component{
    constructor(){
        super();
        this.state ={
            username:'',
            password:''
        }
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    submitLogin = (event) => {
        event.preventDefault();
        document.getElementById('loginButton').innerHTML="Please Wait...";
        document.getElementById('loginButton').disabled=true;
        
        fetch('http://localhost:3001/admin/login', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Login Successful'){
                    console.log('Login Successful');
                    const {username, password} = this.state;
                    let user_detail = {
                      username: username,
                      password:password,
                    };
                    sessionStorage.setItem(
                      "saved_user_details",
                      JSON.stringify({
                        data: user_detail
                      })
                    );
                    window.location = '/admin';
                    document.getElementById('loginButton').innerHTML="Login";
                    document.getElementById('loginButton').disabled=false;
                } else{
                    document.getElementById('loginMessage').innerHTML="Username or password is incorrect! TRY AGAIN.";
                    document.getElementById('loginButton').innerHTML="Login";
                    document.getElementById('loginButton').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('loginButton').innerHTML="Login";
                document.getElementById('loginButton').disabled=false;
                document.getElementById('loginMessage').innerHTML="An error occurred, please check your internet and try again";
            })
    }

    render(){
        return(
            <div className="admin">
                <div className="logo-margin">
                    <img src={logo} alt="logo" width="100px" style={{display:'block', margin:'auto'}} />
                </div>
                <div className="login-form">
                    <h4 style={{textAlign:'center'}}>LOGIN</h4>
                    <div>
                        <div className="">
                            <label>Username*</label><br/>
                            <input value={this.state.username} name="username" onChange={this.handleChange} />
                        </div>
                        <div className="">
                            <label>Password*</label><br/>
                            <input value={this.state.password} name="password" onChange={this.handleChange} />
                        </div>
                        <div style={{color:'red'}} id="loginMessage" ></div>
                        <button className="cnt-btn" onClick={this.submitLogin} id="loginButton">Login</button>
                    </div>
                </div>
            </div>
        )
    }
}