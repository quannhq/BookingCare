import React, { Component } from 'react'
import Slider from "react-slick";
import './Specialty.scss'
import './Medicalfacility.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinicService } from '../../../services/userService';
import specialtyimg from '../../../assets/images/co-xuong-khop.jpg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Medicalfacility extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrClinic: [],
        }
    }
    async componentDidMount() {
        let res = await getAllClinicService();
        // console.log('data in clinic service', res)
        if (res && res.errCode === 0) {
            this.setState({
                arrClinic: res.data
            })
        }
    }
    handerViewDetailClinic = (clinic) => {
        // console.log(clinic)
        this.props.history.push(`/clinicDetail/${clinic}`)

    }

    goListClinic = () => {
        this.props.history.push(`/clinices`)
    }
    render() {
        var settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4,
            initialSlide: 0,
            responsive: [

                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };

        let { arrClinic } = this.state;
        console.log('arr clicic in render', arrClinic)
        return (
            <div className="special container section">
                {/* <h1 className="section_heading">Chuyên khoa phổ biến</h1> */}
                <div className="section__header">
                    <h3>Cơ sở y tế nổi bật</h3>
                    <button onClick={() => this.goListClinic()}>Xem Thêm</button>
                </div>
                <Slider {...settings}>
                    {arrClinic && arrClinic.length > 0 &&
                        arrClinic.map((item, index) => {
                            return (
                                <div className="specialty-card" key={index}
                                    onClick={() => { this.handerViewDetailClinic(item.id) }}
                                >
                                    <div className="card">
                                        <div className="card-img-top card-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}


                </Slider>
            </div >
        )
    }
}
const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Medicalfacility));
