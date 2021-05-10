import React from 'react';
import Back from '../Component/BackToDashboard';

import delet from '../img/delete.svg';

import '../index.css';
import './admin.css';


class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            hero_part:'',
            hero_header:'',
            hero_url:'',
            waw_part:'',
            waw_header:'',
            waw_url:'',
            waw_paragraph:'',
            services_part:'',
            services_header:'',
            services_paragraph1:'',
            services_paragraph2:'',
            products:[],
            new_product_name:'',
            new_product_url:'',
            testimonials: [],
            new_testimonial_header:'',
            new_testimonial_name:'',
            new_testimonial_location:'',
            new_testimonial_paragraph:'',
            isDelete:false,
            isDeleteTestimonial:false,
            item_id:'',
        }
    }

    componentDidMount() {
        if(!sessionStorage.saved_user_details) {
            window.location = '/admin/login';
        } else {
            fetch('http://api.aandtrecycling.com/', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(resp => {
                    //console.log(resp);
                    this.setState({
                        hero_part: resp[3].part,
                        hero_header: resp[3].header,
                        hero_url: resp[3].img_url,
                        waw_part:resp[5].part,
                        waw_header:resp[5].header,
                        waw_url:resp[5].img_url,
                        waw_paragraph: resp[5].paragraph1,
                        services_part:resp[4].part,
                        services_header: resp[4].header,
                        services_paragraph1: resp[4].paragraph1,
                        services_paragraph2:resp[4].paragraph2,
                    })
                })
                fetch('http://api.aandtrecycling.com/carousel', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(resp => {
                        //console.log(resp);
                        this.setState({
                            testimonials: resp,
                        })
                    })
                fetch('http://api.aandtrecycling.com/servicesorproducts', {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(response => response.json())
                    .then(resp => {
                        console.log(resp);
                        this.setState({
                            products: resp,
                        })
                    })
        }
    }
    
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    editHero=(e)=>{
        e.preventDefault();
        document.getElementById('editHero').innerHTML="Please Wait...";
        document.getElementById('editHero').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/home', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                part: this.state.hero_part,
                img_url: this.state.hero_url,
                header: this.state.hero_header,
                paragraph1:'',
                paragraph2:''
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    console.log('Successful');
                    document.getElementById('editHero').innerHTML="Edit";
                    document.getElementById('editHero').disabled=false;
                } else{
                    alert("Edit wasn't successful try again");
                    document.getElementById('editHero').innerHTML="Edit";
                    document.getElementById('editHero').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('editHero').innerHTML="Edit";
                document.getElementById('editHero').disabled=false;
            })
    }

    editWhoAreWe=(e)=>{
        e.preventDefault();
        document.getElementById('editWaw').innerHTML="Please Wait...";
        document.getElementById('editWaw').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/home', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                part: this.state.waw_part,
                img_url: this.state.waw_url,
                header: this.state.waw_header,
                paragraph1:this.state.waw_paragraph,
                paragraph2:''
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

    editServices=(e)=>{
        e.preventDefault();
        document.getElementById('editServices').innerHTML="Please Wait...";
        document.getElementById('editServices').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/home', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                part: this.state.services_part,
                img_url: this.state.services_url,
                header: this.state.services_header,
                paragraph1:this.state.services_paragraph1,
                paragraph2:this.state.services_paragraph2
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    console.log('Successful');
                    document.getElementById('editServices').innerHTML="Edit";
                    document.getElementById('editServices').disabled=false;
                } else{
                    alert("Edit wasn't successful try again");
                    document.getElementById('editServices').innerHTML="Edit";
                    document.getElementById('editServices').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('editServices').innerHTML="Edit";
                document.getElementById('editServices').disabled=false;
            })
    }

    clickRemove=(item_id)=>{
        this.setState({
            isDelete:true,
            item_id: item_id
        })
    }

    clickRemove2=(item_id)=>{
        this.setState({
            isDeleteTestimonial:true,
            item_id: item_id
        })
    }

    cancel=()=>{
        this.setState({isDelete:false})
    }
    cancel2=()=>{
        this.setState({isDeleteTestimonial:false})
    }

    confirmDeleteProduct=()=>{
        fetch('http://api.aandtrecycling.com/admin/home-product-delete', {
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

    addNewProduct=(e)=>{
        e.preventDefault();
        document.getElementById('editProducts').innerHTML="Please Wait...";
        document.getElementById('editProducts').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/home-product-insert', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_name: this.state.new_product_name,
                image_url: this.state.new_product_url
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    console.log('Successful');
                    document.getElementById('editProducts').innerHTML="Add New";
                    document.getElementById('editProducts').disabled=false;
                } else{
                    alert("Request wasn't successful try again");
                    document.getElementById('editProducts').innerHTML="Add New";
                    document.getElementById('editProducts').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('editProducts').innerHTML="Add New";
                document.getElementById('editProducts').disabled=false;
                window.location.reload();
            })
    }

    confirmDeleteTestimonial=()=>{
        fetch('http://api.aandtrecycling.com/admin/carousel-delete', {
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

    addNewTestimonial=(e)=>{
        e.preventDefault();
        document.getElementById('editTestimonials').innerHTML="Please Wait...";
        document.getElementById('editTestimonials').disabled=true;
        fetch('http://api.aandtrecycling.com/admin/carousel-insert', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                header: this.state.new_testimonial_header,
                name: this.state.new_testimonial_name,
                work:this.state.new_testimonial_location,
                content:this.state.new_testimonial_paragraph
            })
        })
            .then(response => response.json())
            .then(message => {
                if (message === 'Success'){
                    console.log('Successful');
                    document.getElementById('editTestimonials').innerHTML="Add New";
                    document.getElementById('editTestimonials').disabled=false;
                } else{
                    alert("Request wasn't successful try again");
                    document.getElementById('editTestimonials').innerHTML="Add New";
                    document.getElementById('editTestimonials').disabled=false;
                }
            })
            .catch(err => {
                document.getElementById('editTestimonials').innerHTML="Add New";
                document.getElementById('editTestimonials').disabled=false;
                window.location.reload();
            })
    }

    render(){
        const {
            hero_header,
            hero_url,
            waw_header,
            waw_url,
            waw_paragraph,
            services_header,
            services_paragraph1,
            services_paragraph2,
            products,
            testimonials
        } = this.state;

        const RenderProducts = _ => products.map((item, index) => (
            <div className="admin-list" key={index}>
                {/**list all */}
                <img src={delet} alt="delete" onClick={()=>this.clickRemove(item.id)} />
                <div>
                    <p><strong>Product Name: </strong> {item.product_name}</p>
                    <p><strong>Image Url: </strong>{item.image_url}</p>
                </div>
            </div>
        ));

        const RenderTestimonials = _ => testimonials.map((item, index) => (
            <div className="admin-list" key={index}>
                {/**list all */}
                <img src={delet} alt="delete" onClick={()=>this.clickRemove2(item.id)} />
                <div>
                    <p><strong>Header: </strong> {item.header}</p>
                    <p><strong>Name: </strong>{item.name}</p>
                    <p><strong>Location: </strong>{item.work}</p>
                    <p><strong>Paragraph: </strong>{item.content}</p>
                </div>
            </div>
        ));

        const Remove =()=>{
            return(
                <div style={{position:'fixed',zIndex:'1000', top:'0', right:'0', bottom:'0', left:'0', background:'rgba(0,0,0,0.4)'}}>
                    <div style={{background:'white',width:'320px',display:'block',margin:'auto',position: 'relative',top: '50%',transform: 'translateY(-50%)',padding:'30px',borderRadius:'10px'
                    }}>
                        <p>Are you sure you want to delete this?</p>
                        <button className="admin-cancel" onClick={this.cancel}>Cancel</button>
                        <button className="admin-delete" onClick={this.confirmDeleteProduct}>Delete</button>
                    </div>
    
                </div>
            );
        }
        
        const Remove2 =()=>{
            return(
                <div style={{position:'fixed',zIndex:'1000', top:'0', right:'0', bottom:'0', left:'0', background:'rgba(0,0,0,0.4)'}}>
                    <div style={{background:'white',width:'320px',display:'block',margin:'auto',position: 'relative',top: '50%',transform: 'translateY(-50%)',padding:'30px',borderRadius:'10px'
                    }}>
                        <p>Are you sure you want to delete this?</p>
                        <button className="admin-cancel" onClick={this.cancel2}>Cancel</button>
                        <button className="admin-delete" onClick={this.confirmDeleteTestimonial}>Delete</button>
                    </div>
    
                </div>
            );
        }
        
        return(
            <div>
                {this.state.isDelete && <Remove/>}
                {this.state.isDeleteTestimonial && <Remove2/>}
                <Back/>
                <div className="admin-top">
                    <div className="container">
                        <h3 >Edit Home page content</h3>
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    <div className="ab-top cnt-slanted"></div>
                </div>
                <div>
                    <div className="cnt-form">
                        <div className="container">
                            <h5 className="admin-text1">HERO SECTION</h5>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label>Header</label><br/>
                                    <input placeholder={hero_header} name="hero_header" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Image Url</label><br/>
                                    <input placeholder={hero_url} name="hero_url" onChange={this.handleChange}/>
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editHero" onClick={this.editHero}>Edit</button>
                                </div>
                            </div>
                            <hr/>
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
                                    <textarea placeholder={waw_paragraph} name="waw_paragraph" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editWaw" onClick={this.editWhoAreWe} >Edit</button>
                                </div>
                            </div>
                            <hr/>
                            <h5 className="admin-text1">SERVICES</h5>
                            <div className="row">
                                <div className="col-lg-6">
                                    <label>Header</label><br/>
                                    <input placeholder={services_header} name="services_header" onChange={this.handleChange}  />
                                </div>
                                <div className="col-lg-12">
                                    <label>Paragraph</label><br/>
                                    <textarea placeholder={services_paragraph1} name="services_paragraph1" onChange={this.handleChange}  />
                                </div>
                                <div className="col-lg-12">
                                    <label>Additional Paragraph</label><br/>
                                    <textarea placeholder={services_paragraph2} name="services_paragraph2" onChange={this.handleChange}  />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editServices" onClick={this.editServices} >Edit</button>
                                </div>
                            </div>
                            <hr/>
                            <h5 className="admin-text1">PRODUCT/SERVICE IMAGES</h5>
                            <div className="row">
                                <div className="col-lg-12">
                                    <RenderProducts/>
                                </div>
                                <div className="col-lg-6">
                                    <label>Image Url</label><br/>
                                    <input name="new_product_url" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Product Name</label><br/>
                                    <input name="new_product_name" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editProducts" onClick={this.addNewProduct} >Add New</button>
                                </div>
                            </div>
                            <hr/>
                            <h5 className="admin-text1">Testimonials</h5>
                            <div className="row">
                                <div className="col-lg-12">
                                    <RenderTestimonials/>
                                </div>
                                <div className="col-lg-12">
                                    <label>Header</label><br/>
                                    <input  name="new_testimonial_header" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Customer Name</label><br/>
                                    <input name="new_testimonial_name" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-6">
                                    <label>Customer Location</label><br/>
                                    <input name="new_testimonial_location" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <label>Paragraph</label><br/>
                                    <textarea name="new_testimonial_paragraph" onChange={this.handleChange} />
                                </div>
                                <div className="col-lg-12">
                                    <button className="cnt-btn" id="editTestimonials" onClick={this.addNewTestimonial} >Add New</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;