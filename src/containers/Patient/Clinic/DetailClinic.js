import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminAction';
import Navbar from '../../HomePage/HeaderHome/Navbar';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import ExtraInforDoctor from '../Doctor/ExtraInforDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import logo from '../../../assets/hopital.jpg';
import { getClinicByIdService } from '../../../services/userService'
import './DetailClinic.scss';
import Footer from '../../HomePage/FooterHome/FooterHome'

class DetailClinic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // arrSpectialty: [59, 60],
            arrClinic: {},
            arrClinicId: [],
            isMore: true,
            showDes: true,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            // console.log('id in doctor detail', id);
            let res = await getClinicByIdService({
                id: id,
            });
            // console.log('get a info doctor service', res);
            this.setState({
                arrClinic: res.data,
                arrClinicId: res.data.doctorClinic
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    showDes = () => {
        this.setState({
            showDes: !this.state.showDes,
        })
    }

    render() {
        let { arrClinicId, arrClinic, isMore, showDes } = this.state
        console.log('id specialty in detail specialty', arrClinic)
        let imageBase64 = '';
        if (arrClinic.image) {
            imageBase64 = new Buffer(arrClinic.image, 'base64').toString('binary');
            console.log(imageBase64)
        }
        return (
            <>
                <div className="clinic-header container">
                    <div className="clinic-header-img">
                        <div className="bgr-clinic" style={{ backgroundImage: `url(${imageBase64})` }}></div>
                    </div>
                    <div className="clinic-header-name">
                        <i class="fas fa-hospital-symbol"></i>
                        Cơ sở y tế:
                        <span>
                            {arrClinic && arrClinic.length > 0 ? '' : ' ' + arrClinic.name}
                        </span>
                    </div>
                    <div className="clinic-header-address">
                        <i class="fas fa-map-marker-alt"></i>
                        Địa chỉ:
                        <span>
                            {arrClinic && arrClinic.length > 0 ? '' : ' ' + arrClinic.address}
                        </span>
                    </div>

                    <div className="clinic-header-btn"
                        onClick={() => this.showDes()}
                    >Đặt lịch khám</div>
                </div>
                <div className="clinic">
                    <div className=" container ">

                        <Navbar />

                        <div className="description">
                            <div className="des-up"
                                onClick={() => this.showDes()}
                            >Giới Thiệu</div>
                            {
                                showDes ?
                                    <div className="des-down">
                                        {arrClinic && arrClinic.length > 0 &&
                                            arrClinic.descriptionHTML
                                            ? arrClinic.descriptionHTML :
                                            <div className="container" dangerouslySetInnerHTML={{
                                                __html: arrClinic.descriptionHTML
                                            }}>
                                            </div>
                                        }
                                    </div>
                                    : <div className=""></div>
                            }


                        </div>

                        <div className="book-up"

                        >Đặt lịch khám</div>
                        {arrClinicId && arrClinicId.length > 0 &&
                            arrClinicId.map((item, index) => {
                                return (
                                    <div className="sp">
                                        <div className="sp-left">

                                            <ProfileDoctor
                                                doctorId={item.doctorId}
                                                // dataSchedule={dataSchedule}
                                                showDescription={true}
                                                isMore={isMore}
                                            />
                                        </div>
                                        <div className="sp-right">
                                            <div className="sp-right-up">
                                                <ScheduleDoctor
                                                    doctorId={item.doctorId}
                                                />
                                            </div>
                                            <div className="sp-right-down">
                                                <ExtraInforDoctor
                                                    doctorId={item.doctorId}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <Footer></Footer>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(actions.getAllDoctor()),


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
