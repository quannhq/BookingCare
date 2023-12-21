import React, { Component, Fragment } from 'react'
import logo from '../../../assets/images/images.png'
import { withRouter } from 'react-router';
import './Navbar.scss'
class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }
    goHomePage = () => {
        this.props.history.push(`/home`)
    }
    goLoginDoctor = () => {
        this.props.history.push(`/login`)
    }

    goListSpecialty = () => {
        this.props.history.push(`/specialties`)
    }

    goListClinic = () => {
        this.props.history.push(`/clinices`)
    }

    goListDoctor = () => {
        this.props.history.push(`/doctors`)
    }

    render() {
        return (
            <div className="header">
                <div className="navbar_home container">
                    <div className="logo" onClick={() => this.goHomePage()}>
                        <a href="#" className="logo_link">
                            <i className="fas fa-hospital-alt logo_icon"></i>
                            DoctorCare
                        </a>
                    </div>
                    <div className="content">
                        <div className="content_children" onClick={() => this.goListSpecialty()}>
                            <p> <b>Chuyên Khoa</b> </p>
                            Tìm bác sĩ theo chuyên khoa
                        </div>
                        <div className="content_children" onClick={() => this.goListClinic()}>
                            <p> <b>Cơ sở y tế</b> </p>
                            Chọn bệnh viện phòng khám
                        </div>
                        <div className="content_children" onClick={() => this.goListDoctor()}>
                            <p> <b>Bác sĩ</b> </p>
                            Chọn bác sĩ giỏi
                        </div>
                        <div className="content_children">
                            <p> <b>Gói khám</b> </p>
                            Khám sức khỏe tổng quát
                        </div>
                    </div>
                    <div className="login">
                        <a onClick={() => this.goLoginDoctor()} > Đăng nhập/ Đăng kí</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Navbar)
