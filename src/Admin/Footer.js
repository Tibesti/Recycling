import React from 'react';
import Back from '../Component/BackToDashboard';

import '../index.css';
import './admin.css';



class Footer extends React.Component {
    constructor(){
        super();
        this.state = {
            phone:'',
            email:'',
            address:'',
            id:'',
        }
    }

    componentDidMount() {
        if(!sessionStorage.saved_user_details) {
            window.location = '/admin/login';
        } else{
            fetch('http://api.aandtrecycling.com/footer', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(resp => {
                        //console.log(resp);
                        this.setState({
                            phone: resp[0].phone,
                            email:resp[0].email,
                            address:resp[0].address,
                            id:resp[0].id
                        })
                    })
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    editSupport=(e)=>{
        e.preventDefault();
        document.getElementById('editSupport').innerHTML="Please Wait...";
        document.getElementById('editSupport').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/footer', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.id,
                phone: this.state.phone,
                email: this.state.email,
                address: this.state.address
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    console.log('Successful');
                    document.getElementById('editSupport').innerHTML="Edit";
                    document.getElementById('editSupport').disabled=false;
                } else{
                    alert("Edit wasn't successful try again");
                    document.getElementById('editSupport').innerHTML="Edit";
                    document.getElementById('editSupport').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('editSupport').innerHTML="Edit";
                document.getElementById('editSupport').disabled=false;
            })
    }

    render(){
        const {phone, email, address} = this.state;

        return(
            <div>
                <Back/>
                <div className="admin-top">
                    <div className="container">
                        <h3>Edit Footer Products and Support Content</h3>
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    <div className="ab-top cnt-slanted"></div>
                </div>
                <div>
                    <div className="cnt-form">
                        <div className="container">
                            {/*<h5 className="admin-text1">Products</h5>
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="admin-list">
                                        <img src={delet} alt="delete" />
                                        <p>High something something for content ooo</p>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <label>New product at footer</label><br/>
                                    <input />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn">Add New</button>
                                </div>
                            </div>
                            <hr/>*/}
                            <h5 className="admin-text1">Support</h5>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label>Phone</label><br/>
                                    <input placeholder={phone} name="phone" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Email</label><br/>
                                    <input placeholder={email} name="email" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <label>Address</label><br/>
                                    <input placeholder={address} name="address" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editSupport" onClick={this.editSupport}>Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;