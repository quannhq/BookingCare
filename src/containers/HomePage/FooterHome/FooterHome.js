import React, { Component } from "react";
import "./FooterHome.scss";
import { Link } from "react-router-dom";
import card1 from "../../../assets/card1.png"
import card2 from "../../../assets/card2.png"
import card3 from "../../../assets/card3.png"
import card4 from "../../../assets/card4.png"

class FooterHome extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <div className="footer_cover">
                <div className="footer_container section container">

                    <div className="footer_content">
                        <Link href="#" className="footer_logo">
                            <i className="fas fa-hospital-alt footer_logo-icon"></i>
                            DoctorCare
                        </Link>

                        <h3 className="footer_title">
                            Đăng kí để theo dõi mới nhất
                        </h3>
                        <div className="footer_subscribe">
                            <input type="text" placeholder="Enter your email" className="footer_input" />
                            <button className="footer_button">
                                Đăng kí
                                <i className="ri-arrow-right-up-line button_icon"></i>
                            </button>
                        </div>
                    </div>

                    <div className="footer_content">
                        <h3 className="footer_title">
                            Địa chỉ
                        </h3>
                        <ul className="footer_data">
                            <li className="footer_information">1234 - Quận 3 - HCM</li>
                            <li className="footer_information">Phạm Văn Đồng - 43210</li>
                            <li className="footer_information">123-456-789</li>
                        </ul>
                    </div>

                    <div className="footer_content">
                        <h3 className="footer_title">
                            Liên hệ
                        </h3>
                        <ul className="footer_data">
                            <li className="footer_information">1234 - Quận 3 - HCM</li>

                            <div className="footer_social">
                                <Link href="#" className="footer_social-link">
                                    <i class="fab fa-facebook-square"></i>
                                </Link>
                                <Link href="#" className="footer_social-link">
                                    <i class="fab fa-instagram"></i>
                                </Link>
                                <Link href="#" className="footer_social-link">
                                    <i class="fab fa-twitter"></i>
                                </Link>
                            </div>
                        </ul>
                    </div>

                    <div className="footer_content">
                        <h3 className="footer_title">
                            Chúng tôi thanh toán <br></br>các loại thẻ
                        </h3>
                        <div className="footer_cards">
                            <img src={card1} alt="" className="footer_card" />
                            <img src={card2} alt="" className="footer_card" />
                            <img src={card3} alt="" className="footer_card" />
                            <img src={card4} alt="" className="footer_card" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (FooterHome);
