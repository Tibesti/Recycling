import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './admin.css';

export default class Dashboard extends Component{
    componentDidMount() {
        if(!sessionStorage.saved_user_details) {
            window.location = '/admin/login';
        }
    }

    logout = () => {
        sessionStorage.clear();
        window.location= '/admin/login';
    }

    render(){
        return(
            <div className="admin">
                <div className="ab-top">
                    <button className="admin-logout" onClick={this.logout}>Logout</button>
                    <div className="container">
                        <h1>Admin Dashboard</h1>
                        <p className="dashboard-p">All contents included in the website can be edited in this Dashboard. Click on the buttons below to select which page you want to edit</p>
                        <div>
                            <Link to="/admin/home"><button className="cnt-btn dashboard-btn">Edit Home Page</button></Link>
                            <Link to="/admin/about"><button className="cnt-btn dashboard-btn">Edit About Page</button></Link>
                            <Link to="/admin/footer"><button className="cnt-btn dashboard-btn">Edit Footer</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}