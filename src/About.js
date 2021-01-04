import React from 'react';
import Nav from './Component/Nav';
import Footer from './Component/Footer';

import './index.css';


class About extends React.Component {
    constructor(){
        super();
        this.state = {
            header: '',
            img_url: '',
            paragraph1: '',
            paragraph2: '',
            paragraph3: '',
            services:[],
            first_image:'',
            second_image:'',
        }
    }
    componentDidMount(){
        fetch('https://tibesti.smartvesty.com/about', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(resp => {
                    console.log(resp);
                    this.setState({
                        header: resp[1].header,
                        img_url: resp[1].img_url,
                        paragraph1: resp[1].paragraph1,
                        paragraph2: resp[1].paragraph2,
                        paragraph3: resp[1].paragraph3,
                    })
                })
            fetch('https://tibesti.smartvesty.com/whatweoffer', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(resp => {
                    console.log(resp);
                    this.setState({
                        services: resp,
                    })
                })
            fetch('https://tibesti.smartvesty.com/about-images', {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(resp => {
                    console.log(resp);
                    this.setState({
                        first_image:resp[0].first_image,
                        second_image:resp[0].second_image
                    })
                })
        
    }

    render(){
        const { header, img_url, paragraph1, paragraph2, services } = this.state;

        const RenderService = _ => services.map((item, index) => (
            <div style={{display:'flex', margin:'20px 0 0'}} key={index}>
                <div style={{width:'20px', height:'20px', background:' #40DD90', marginRight:'10px'}}></div>
                <p>{item.list}</p>
            </div>
        ));

        return(
            <div>
                <Nav/>
                <div className="ab-top">
                    <div className="container">
                        <h1>About Us</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. A non molestie ut laoreet aliquam.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="h-box1">
                                <img width="100%" src={img_url} alt="hero-view" />
                            </div>
                        </div>
                        <div className="col-md-6 who-are-we">
                            <h5>WHO ARE WE</h5>
                            <h3>{header}</h3>
                            <p>{paragraph1}</p>
                            <p>{paragraph2}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div  className="col-md-4 who-are-we">
                            <h5>SERVICES</h5>
                            <h3>WHAT WE OFFER</h3>
                            <RenderService />
                        </div>
                        <div  className="col-md-8">
                            <div className="ab-box1">
                                <div className="ab-box3">
                                    <img width="100%" src={this.state.first_image} alt="hero-view" />
                                </div>
                            </div>
                            <div className="ab-box2">
                                <div className="ab-box4">
                                    <img width="100%" src={this.state.second_image} alt="hero-view" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ab-box5"></div>{/**to cover for absolute positioning glitch */}
                </div>
                <Footer/>
            </div>
        )
    }
}

export default About;