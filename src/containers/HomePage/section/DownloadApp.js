import React, { Component } from 'react';
import "./DownloadApp.scss"
import qrCode from "../../../assets/qr-code.png"
import appImg from "../../../assets/app.png"


class DownloadApp extends Component {

    render() {

        return (
            <div className="download_app section container">
                <div className="download_left">
                    <div className="download_right-content">
                        <h1 className="download_heading">Doctor Care</h1>
                        <p className="download_description">
                            Doctor Care hiện là nền tảng đặt lịch khám bệnh trực tuyến
                            #1 Việt Nam. Đồng hành cùng chúng tôi, bạn có những
                            buổi thăm khám sức khoẻ một cách thoải mái, tiện lợi. Với Luxstay,
                            việc đặt lịch, phòng khám, chuyên khoa, bác sĩ...
                            trở nên nhanh chóng, thuận tiện và dễ dàng.</p>
                    </div>
                    <div className="download_right-qr">
                        <img className="download_left-img" src={qrCode} alt="" />
                    </div>
                </div>
                <div className="download_right">
                    <img className="download_right-img" src={appImg} alt="" />
                </div>
            </div>
        );
    }
}


export default (DownloadApp);
