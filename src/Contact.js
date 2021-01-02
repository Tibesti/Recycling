import React from 'react';
import Nav from './Component/Nav';
import Footer from './Component/Footer';

import './index.css';


class Contact extends React.Component {
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            phone:'',
            company:'',
            message:''
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    sendContactMessage = (e) => {
        e.preventDefault();
        document.getElementById('contact').innerHTML="Please Wait...";
        document.getElementById('contact').disabled=true;
        fetch('http://localhost:3001/contact', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                company: this.state.company,
                message: this.state.message
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    alert('Your form has been submitted successfully');
                    document.getElementById('contact').innerHTML="Submit";
                    document.getElementById('contact').disabled=false;
                } else{
                    alert("Submission wasn't successful try again");
                    document.getElementById('contact').innerHTML="Submit";
                    document.getElementById('contact').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('contact').innerHTML="Submit";
                document.getElementById('contact').disabled=false;
            })    
    }

    render(){
        return(
            <div>
                <Nav/>
                <div className="ab-top">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. A non molestie ut laoreet aliquam.</p>
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    <div className="ab-top cnt-slanted"></div>
                </div>
                <div>
                    <div className="cnt-form">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6">
                                    <label>Full Name*</label><br/>
                                    <input name="name" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Email Address*</label><br/>
                                    <input name="email" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Phone</label><br/>
                                    <input name="phone" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Company Name</label><br/>
                                    <input name="company" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <label>Message*</label><br/>
                                    <textarea name="message" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="contact" onClick={this.sendContactMessage}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row cnt-box2">
                        <div className="col-md-4 cnt-box1">
                            <h4>Email Us</h4>
                            <p>iewfgidfishfih</p>
                        </div>
                        <div className="col-md-4 cnt-box1">
                            <h4>Visit Us</h4>
                            <p>iewfgidfishfih</p>
                        </div>
                        <div className="col-md-4 cnt-box1">
                            <h4>Call Us</h4>
                            <p>iewfgidfishfih</p>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Contact;