import React, { Component } from 'react'
import './HeaderHome.scss'
import homeIcon1 from "../../../assets/home-icon-1.png"
import homeIcon2 from "../../../assets/home-icon-2.png"
import homeIcon3 from "../../../assets/home-icon-3.png"
import homeIcon4 from "../../../assets/home-icon-4.png"
import homeIcon5 from "../../../assets/home-icon-5.png"

export class HeaderHome extends Component {
    render() {
        return (
            <div className="home" id="home">
                <div className="home_cover">
                    <div className="content">
                        <h3>dịch vụ <span>đặt lịch</span> khám bệnh cho bạn</h3>
                        <p>sẽ thật tuyệt nếu nhiều trung tâm chăm sóc sức khỏe tập trung vào sức khỏe tốt và ít hơn vào điều trị bệnh. </p>

                    </div>
                </div>
                <div className="home_cover-footer">

                    <div className="home_list container">
                        <div className="home_item">
                            <div className="home_circle">
                                <img className="home_img" src={homeIcon1} alt="" />
                            </div>
                            <h3 className="home_title">Khám <br></br> chuyên khoa</h3>
                        </div>
                        <div className="home_item">
                            <div className="home_circle">
                                <img className="home_img" src={homeIcon2} alt="" />
                            </div>
                            <h3 className="home_title">Khám <br></br> từ xa</h3>
                        </div>
                        <div className="home_item">
                            <div className="home_circle">
                                <img className="home_img" src={homeIcon3} alt="" />
                            </div>
                            <h3 className="home_title">Khám <br></br> tổng quát</h3>
                        </div>
                        <div className="home_item">
                            <div className="home_circle">
                                <img className="home_img" src={homeIcon4} alt="" />
                            </div>
                            <h3 className="home_title">Xét nghiệm<br></br> y học</h3>
                        </div>
                        <div className="home_item">
                            <div className="home_circle">
                                <img className="home_img" src={homeIcon5} alt="" />
                            </div>
                            <h3 className="home_title">Sức khoẻ<br></br> tinh thần</h3>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default HeaderHome
