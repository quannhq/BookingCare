import React, { Component } from 'react'
import Slider from "react-slick";
import './Specialty.scss';
import './Doctor.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import specialtyimg from '../../../assets/images/co-xuong-khop.jpg'
import * as actions from '../../../store/actions/adminAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class Doctor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            topDoctors: [],
            aDoctor: {},
        }
    }

    componentDidMount() {
        this.props.getTopDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(prevProps)
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                topDoctors: this.props.topDoctors
            })
        }
    }
    handerViewDetailDoctor = (doctor) => {
        // console.log(doctor)
        this.props.history.push(`/doctorDetail/${doctor}`)

    }
    goListDoctor = () => {
        this.props.history.push(`/doctors`)
    }
    render() {
        var settings = {
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        // console.log('top doctor in doctor.js', this.state.topDoctors)
        let topDoctors = this.state.topDoctors;
        // console.log(topDoctors)
        return (
            <section className="special section container" >
                <div className="section__header">
                    <h3>Bác sĩ nổi bật</h3>
                    <button onClick={() => this.goListDoctor()}>Xem Thêm</button>
                </div>
                <div className="sections-content">
                    <Slider {...settings}>
                        {topDoctors.map((item, index) => {
                            let imageBase64 = '';
                            if (item.image) {
                                imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                // console.log(imageBase64)
                            }
                            let name = `${item.firstName} ${item.lastName}`
                            console.log(item)
                            return (
                                <div className="sections-content-img doctor-img"
                                    onClick={() => { this.handerViewDetailDoctor(item.id) }}
                                >
                                    <img src={imageBase64}></img>
                                    <h3> </h3>
                                    <h4>Bác sĩ {name}</h4>
                                    {/* <span>Co xuong khop</span> */}
                                </div>
                            )
                        })}


                    </Slider>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        topDoctors: state.admin.topDoctors,
        aDoctor: state.admin.aDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getTopDoctor: () => dispatch(actions.getTopDoctor()),


    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));