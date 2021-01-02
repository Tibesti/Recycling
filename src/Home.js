import React from 'react';
import Nav from './Component/Nav';
import Footer from './Component/Footer';

import './index.css';
import quote from './img/Vector.svg';
import right from './img/arrow-right.svg';
import left from './img/arrow-left.svg';


class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            hero_header:'',
            hero_url:'',
            waw_header:'',
            waw_url:'',
            waw_paragraph:'',
            services_header:'',
            services_paragraph1:'',
            services_paragraph2:'',
            products:[],
            testimonials: [],
        }
    }

    componentDidMount(){
        fetch('https://tibesti.smartvesty.com/', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(resp => {
                //console.log(resp);
                this.setState({
                    hero_header: resp[3].header,
                    hero_url: resp[3].img_url,
                    waw_header:resp[5].header,
                    waw_url:resp[5].img_url,
                    waw_paragraph: resp[5].paragraph1,
                    services_header: resp[4].header,
                    services_paragraph1: resp[4].paragraph1,
                    services_paragraph2:resp[4].paragraph2,
                })
            })
            fetch('https://tibesti.smartvesty.com/carousel', {
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
            fetch('https://tibesti.smartvesty.com/servicesorproducts', {
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

    rightScroll = () => {
        document.getElementById('testimonial').scrollLeft += 300;
    }
    
    leftScroll = () => {
        document.getElementById('testimonial').scrollLeft -= 300;
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
                <div>
                    <p><strong>Product Name: </strong> {item.product_name}</p>
                    <p><strong>Image Url: </strong>{item.image_url}</p>
                </div>
            </div>
        ));

        const RenderTestimonials = _ => testimonials.map((item, index) => (
            <div className="admin-list" key={index}>
                {/**list all */}
                <div>
                    <p><strong>Header: </strong> {item.header}</p>
                    <p><strong>Name: </strong>{item.name}</p>
                    <p><strong>Location: </strong>{item.work}</p>
                    <p><strong>Paragraph: </strong>{item.content}</p>
                </div>
            </div>
        ));

        return(
            <div>
                <Nav />
                <div className="container">
                    <div style={{height:'120px'}}></div>
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="hero-txt">{hero_header}</h1>
                            <button className="main-btn">Get Started</button>
                        </div>
                        <div className="col-md-6 d-none d-md-block" style={{marginBottom:'80px'}}>
                            <img width="100%" src={hero_url} alt="hero-view" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h-box1">
                                <img width="100%" src={waw_url} alt="hero-view" />
                            </div>
                        </div>
                        <div className="col-md-6 who-are-we">
                            <h5>WHO ARE WE</h5>
                            <h3>{waw_header}</h3>
                            <p>{waw_paragraph}</p>
                            <span>- LEARN MORE</span>
                        </div>
                    </div>
                    <div style={{marginTop:'70px'}}>
                        <div className="row">
                            <div className="col-md-8 col-lg-6 d-block d-md-none">{/**This block shows only on mobile */}
                                <div style={{width:'50%', float:'left'}}>
                                    <div  className="h-box2">
                                        <img width="100%" src={hero_url} alt="hero-view" />
                                    </div>
                                    <p className="h-box2-p">HDPE -High density polyethylene</p>
                                    <div  className="h-box2">
                                        <img width="100%" src={hero_url} alt="hero-view" />
                                    </div>
                                    <p className="h-box2-p">HDPE -High density polyethylene</p>
                                </div>
                                <div style={{width:'50%', float:'right'}}>
                                    <div  className="h-box2">
                                        <img width="100%" src={hero_url} alt="hero-view" />
                                    </div>
                                    <p className="h-box2-p">HDPE -High density polyethylene</p>
                                
                                    <div  className="h-box2">
                                        <img width="100%" src={hero_url} alt="hero-view" />
                                    </div>
                                    <p className="h-box2-p">HDPE -High density polyethylene</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-6 who-are-we">
                                <h5>SERVICES</h5>
                                <h3>A different kind of chemical company</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id bibendum velit malesuada blandit viverra at consequat ut. At eget pharetra, facilisis in. Varius ornare tortor proin tortor orci, et duis. Senectus nisi erat elementum quis praesent eget.</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id bibendum velit malesuada blandit viverra at consequat ut. At eget pharetra, facilisis in. Varius ornare tortor proin tortor orci, et duis. Senectus nisi erat elementum quis praesent eget.</p>
                                <button className="main-btn">SCHEDULE A MEETING</button>
                            </div>
                            <div className="col-md-8 col-lg-6 d-none d-md-block">
                                <div style={{width:'50%', float:'left'}}>
                                    <div  className="h-box2">
                                        <img width="100%" src={hero_url} alt="hero-view" />
                                    </div>
                                    <p className="h-box2-p">HDPE -High density polyethylene</p>
                                
                                    <div  className="h-box2">
                                        <img width="100%" src={hero_url} alt="hero-view" />
                                    </div>
                                    <p className="h-box2-p">HDPE -High density polyethylene</p>
                                </div>
                                <div style={{width:'50%', float:'right'}}>
                                    <div  className="h-box2">
                                        <img width="100%" src={hero_url} alt="hero-view" />
                                    </div>
                                    <p className="h-box2-p">HDPE -High density polyethylene</p>
                                
                                    <div  className="h-box2">
                                        <img width="100%" src={hero_url} alt="hero-view" />
                                    </div>
                                    <p className="h-box2-p">HDPE -High density polyethylene</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{height:'50px'}}></div>
                <div className="container">
                    <div style={{position:'relative'}}>
                        <div className="circle-quote"></div>
                        <img src={quote} alt="quote" className="quote" />
                        <h2>We've worked with them</h2>
                        <h2>We Trust Each Other</h2>
                        <div className="d-none d-sm-block">
                            <div style={{position:'absolute', bottom:'0', right:'0'}}>
                                <img onClick={this.rightScroll} src={right} alt="right" />
                            </div>
                            <div style={{position:'absolute', bottom:'6px', right:'70px'}}>
                                <img onClick={this.leftScroll} src={left} alt="left" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="testimonial container" id="testimonial">
                    <div className="testimonial-box">
                        <h4>1Great Services With Good Quality Prroduct</h4>
                        <p>I truly have nothing but the highest praise and apperciation for all that you did  for us . saving us on buying quality product at a reduced price</p>
                        <div style={{display:'flex'}}>
                            <div className="circle1"></div>
                            <div>
                                <h5>Shongai</h5>
                                <p>Ogun State Client</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-box">
                        <h4>2 Services With Good Quality Prroduct</h4>
                        <p>I truly have nothing but the highest praise and apperciation for all that you did  for us . saving us on buying quality product at a reduced price</p>
                        <div style={{display:'flex'}}>
                            <div className="circle1"></div>
                            <div>
                                <h5>Shongai</h5>
                                <p>Ogun State Client</p>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-box">
                        <h4>3Great Services With Good Quality Prroduct</h4>
                        <p>I truly have nothing but the highest praise and apperciation for all that you did  for us . saving us on buying quality product at a reduced price</p>
                        <div style={{display:'flex'}}>
                            <div className="circle1"></div>
                            <div>
                                <h5>Shongai</h5>
                                <p>Ogun State Client</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Home;