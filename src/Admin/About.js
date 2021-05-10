import React from 'react';
import Back from '../Component/BackToDashboard';
import delet from '../img/delete.svg';

import '../index.css';
import './admin.css';


class About extends React.Component {
    constructor(){
        super();
        this.state = {
            waw_part:'',
            waw_header:'',
            waw_url:'',
            waw_paragraph1:'',
            waw_paragraph2:'',
            services:[],
            new_service:'',
            first_image:'',
            second_image:'',
            item_id:'',
            isDelete:false
        }
    }

    componentDidMount() {
        if(!sessionStorage.saved_user_details) {
            window.location = '/admin/login';
        }  else {
            fetch('http://api.aandtrecycling.com/about', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(resp => {
                    //console.log(resp);
                    this.setState({
                        waw_part:resp[1].part,
                        waw_header:resp[1].header,
                        waw_url:resp[1].img_url,
                        waw_paragraph1:resp[1].paragraph1,
                        waw_paragraph2:resp[1].paragraph2,
                    })
                })

                fetch('http://api.aandtrecycling.com/about-images', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(resp => {
                        //console.log(resp);
                        this.setState({
                            first_image:resp[0].first_image,
                            second_image:resp[0].second_image
                        })
                    })
                
                fetch('http://api.aandtrecycling.com/whatweoffer', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(resp => {
                        //console.log(resp);
                        this.setState({
                            services: resp
                        })
                    })
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    editWhoAreWe=(e)=>{
        e.preventDefault();
        document.getElementById('editWaw').innerHTML="Please Wait...";
        document.getElementById('editWaw').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/about', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                part: this.state.waw_part,
                img_url: this.state.waw_url,
                header: this.state.waw_header,
                paragraph1:this.state.waw_paragraph1,
                paragraph2:this.state.waw_paragraph2
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    console.log('Successful');
                    document.getElementById('editWaw').innerHTML="Edit";
                    document.getElementById('editWaw').disabled=false;
                } else{
                    alert("Edit wasn't successful try again");
                    document.getElementById('editWaw').innerHTML="Edit";
                    document.getElementById('editWaw').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('editWaw').innerHTML="Edit";
                document.getElementById('editWaw').disabled=false;
            })
    }

    editImages=(e)=>{
        e.preventDefault();
        document.getElementById('editImages').innerHTML="Please Wait...";
        document.getElementById('editImages').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/about-images', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_image: this.state.first_image,
                second_image: this.state.second_image
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    console.log('Successful');
                    document.getElementById('editImages').innerHTML="Edit Images";
                    document.getElementById('editImages').disabled=false;
                } else{
                    alert("Edit wasn't successful try again");
                    document.getElementById('editImages').innerHTML="Edit Images";
                    document.getElementById('editImages').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('editImages').innerHTML="Edit Images";
                document.getElementById('editImages').disabled=false;
            })
    }

    clickRemove=(item_id)=>{
        this.setState({
            isDelete:true,
            item_id: item_id
        })
    }

    cancel=()=>{
        this.setState({isDelete:false})
    }

    confirmDelete=()=>{
        fetch('http://api.aandtrecycling.com/admin/whatweoffer-delete', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: this.state.item_id
            })
        })
        this.setState({isDelete:false})
        window.location.reload();
    }

    addNewService=(e)=>{
        e.preventDefault();
        document.getElementById('editService').innerHTML="Please Wait...";
        document.getElementById('editService').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/whatweoffer-insert', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                list: this.state.new_service
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    console.log('Successful');
                    document.getElementById('editService').innerHTML="Add New";
                    document.getElementById('editService').disabled=false;
                } else{
                    alert("Request wasn't successful try again");
                    document.getElementById('editService').innerHTML="Add New";
                    document.getElementById('editService').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('editService').innerHTML="Add New";
                document.getElementById('editService').disabled=false;
                window.location.reload();
            })
    }

    render(){
        const {waw_header, waw_url, waw_paragraph1, waw_paragraph2, services, first_image, second_image} = this.state;

        const RenderServices = _ => services.map((item, index) => (
            <div className="admin-list" key={index}>
                {/**list all */}
                <img src={delet} alt="delete"  onClick={()=>this.clickRemove(item.id)} />
                <p>{item.list}</p>
            </div>
        ));

        const Remove =()=>{
            return(
                <div style={{position:'fixed',zIndex:'1000', top:'0', right:'0', bottom:'0', left:'0', background:'rgba(0,0,0,0.4)'}}>
                    <div style={{background:'white',width:'320px',display:'block',margin:'auto',position: 'relative',top: '50%',transform: 'translateY(-50%)',padding:'30px',borderRadius:'10px'
                    }}>
                        <p>Are you sure you want to delete this?</p>
                        <button className="admin-cancel" onClick={this.cancel}>Cancel</button>
                        <button className="admin-delete" onClick={this.confirmDelete}>Delete</button>
                    </div>
    
                </div>
            );
        }

        return(
            <div>
                {this.state.isDelete && <Remove/>}
                <Back/>
                <div className="admin-top">
                    <div className="container">
                        <h3>Edit About page content</h3>
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    <div className="ab-top cnt-slanted"></div>
                </div>
                <div>
                    <div className="cnt-form">
                        <div className="container">
                            <h5 className="admin-text1">WHO ARE WE</h5>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label>Header</label><br/>
                                    <input placeholder={waw_header} name="waw_header" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Image Url</label><br/>
                                    <input placeholder={waw_url} name="waw_url" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <label>Paragraph</label><br/>
                                    <textarea placeholder={waw_paragraph1} name="waw_paragraph1" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <label>Additional Paragraph</label><br/>
                                    <textarea placeholder={waw_paragraph2} name="waw_paragraph2" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editWaw" onClick={this.editWhoAreWe} >Edit</button>
                                </div>
                            </div>
                            <hr/>
                            <h5 className="admin-text1">SERVICES (WHAT WE OFFER)</h5>
                            <div className="row">
                                <div className="col-lg-12">
                                    <RenderServices />
                                </div>
                                <div className="col-lg-6">
                                    <label>Add a new service</label><br/>
                                    <input name="new_service" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editService" onClick={this.addNewService}>Add New</button>
                                </div>
                                <div className="col-lg-6">
                                    <label>First Image Url</label><br/>
                                    <input placeholder={first_image} name="first_image" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Second Image Url</label><br/>
                                    <input placeholder={second_image} name="second_image" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editImages" onClick={this.editImages}>Edit Images</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default About;