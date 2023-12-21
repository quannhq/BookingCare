import React, { Component } from 'react'
import Slider from "react-slick";
import './Specialty.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecialtyService } from '../../../services/userService'
import specialtyimg from '../../../assets/images/co-xuong-khop.jpg'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Specialty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            arrSpectials: [],
        }
    }
    async componentDidMount() {
        let res = await getAllSpecialtyService();
        // console.log('data in specialty service', res)
        if (res && res.errCode === 0) {
            this.setState({
                arrSpectials: res.data
            })
        }
    }
    handerViewDetailSpecialty = (specialty) => {
        // console.log(specialty)
        this.props.history.push(`/specialtyDetail/${specialty}`)

    }

    goListSpecialty = () => {
        this.props.history.push(`/specialties`)
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
        let { arrSpectials } = this.state;
        // console.log('arr specialty in render', arrSpectials)
        return (
            <div className="special container section">
                {/* <h1 className="section_heading">Chuyên khoa phổ biến</h1> */}
                <div className="section__header">
                    <h3>Chuyên khoa phổ biến</h3>
                    <button onClick={() => this.goListSpecialty()}>Xem Thêm</button>
                </div>
                <Slider {...settings}>
                    {arrSpectials && arrSpectials.length > 0 &&
                        arrSpectials.map((item, index) => {
                            return (
                                <div className="specialty-card"
                                    onClick={() => { this.handerViewDetailSpecialty(item.id) }}
                                >
                                    <div className="card">
                                        <div className="card-img-top card-img" style={{ backgroundImage: `url(${item.image})` }}></div>
                                        <div className="card-body">
                                            <h5 className="card-title">Chuyên khoa {item.name}</h5>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));

