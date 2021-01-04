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
            testimonials: [],
            product1:'',
            product1_img:'',
            product2:'',
            product2_img:'',
            product3:'',
            product3_img:'',
            product4:'',
            product4_img:'',
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
                    //console.log(resp);
                    this.setState({
                        product1:resp[0].product_name,
                        product1_img:resp[0].image_url,
                        product2:resp[1].product_name,
                        product2_img:resp[1].image_url,
                        product3:resp[2].product_name,
                        product3_img:resp[2].image_url,
                        product4:resp[3].product_name,
                        product4_img:resp[3].image_url,
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
            testimonials,
            product1,
            product1_img,
            product2,
            product2_img,
            product3,
            product3_img,
            product4,
            product4_img,
        } = this.state;

        const RenderTestimonials = _ => testimonials.map((item, index) => (
            <div className="testimonial-box" key={index}>
                <h4>{item.header}</h4>
                <p>{item.content}</p>
                <div style={{display:'flex'}}>
                    <div className="circle1"></div>
                    <div>
                        <h5>{item.name}</h5>
                        <p>{item.work}</p>
                    </div>
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
                            <button className="main-btn" >Get Started</button>
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
                                        <img width="100%" src={product1_img} alt="services" />
                                    </div>
                                    <p className="h-box2-p">{product1}</p>
                                    <div  className="h-box2">
                                        <img width="100%" src={product2_img} alt="services" />
                                    </div>
                                    <p className="h-box2-p">{product2}</p>
                                </div>
                                <div style={{width:'50%', float:'right'}}>
                                    <div  className="h-box2">
                                        <img width="100%" src={product3_img} alt="services" />
                                    </div>
                                    <p className="h-box2-p">{product3}</p>
                                
                                    <div  className="h-box2">
                                        <img width="100%" src={product4_img} alt="services" />
                                    </div>
                                    <p className="h-box2-p">{product4}</p>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-6 who-are-we">
                                <h5>SERVICES</h5>
                                <h3>{services_header}</h3>
                                <p>{services_paragraph1}</p>
                                <p>{services_paragraph2}</p>
                                <button className="main-btn">SCHEDULE A MEETING</button>
                            </div>
                            <div className="col-md-8 col-lg-6 d-none d-md-block">
                            <div style={{width:'50%', float:'left'}}>
                                    <div  className="h-box2">
                                        <img width="100%" src={product1_img} alt="services" />
                                    </div>
                                    <p className="h-box2-p">{product1}</p>
                                    <div  className="h-box2">
                                        <img width="100%" src={product2_img} alt="services" />
                                    </div>
                                    <p className="h-box2-p">{product2}</p>
                                </div>
                                <div style={{width:'50%', float:'right'}}>
                                    <div  className="h-box2">
                                        <img width="100%" src={product3_img} alt="services" />
                                    </div>
                                    <p className="h-box2-p">{product3}</p>
                                
                                    <div  className="h-box2">
                                        <img width="100%" src={product4_img} alt="services" />
                                    </div>
                                    <p className="h-box2-p">{product4}</p>
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
                    <RenderTestimonials />
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Home;