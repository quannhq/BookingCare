import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminAction';
import Navbar from '../../HomePage/HeaderHome/Navbar'
import './DetailDoctor.scss'
import './ScheduleDoctor.scss'
import moment from 'moment';
import localization from 'moment/locale/vi';
import BookingModal from './Modal/BookingModal';
import { getScheduleDoctorByDate } from '../../../services/userService'

class ScheduleDoctor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            allDays: [],
            allAvailabeTimes: [],
            isBookingModal: false,
            dataSchedule: {},
        }
    }

    async componentDidMount() {
        let allDays = this.getAllDays()
        // console.log('all day ', allDays);
        if (this.props.doctorId) {
            let allDays = this.getAllDays();
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);
            this.setState({
                allAvailabeTimes: res.data ? res.data : [],
            })
        }

        this.setState({
            allDays: allDays
        });

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let allDays = this.getAllDays();
            let res = await getScheduleDoctorByDate(this.props.doctorId, allDays[0].value);
            this.setState({
                allAvailabeTimes: res.data ? res.data : [],
            })
        }
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    getAllDays() {
        let allDays = [];
        //thêm 7 ngày kể từ hôm nay
        for (let i = 0; i < 7; i++) {
            let object = {};
            if (i === 0) {
                let DDMM = moment(new Date()).format('DD/MM');
                object.label = 'Hôm nay - ' + DDMM;
            } else {
                let lableUp = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                object.label = this.capitalizeFirstLetter(lableUp);
            }
            object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf()
            allDays.push(object);
        }
        return allDays;
    }

    handleOnChangeSlect = async (event) => {
        if (this.props.doctorId) {
            let doctorId = this.props.doctorId;
            let date = event.target.value;
            let res = await getScheduleDoctorByDate(doctorId, date);
            let allTime = [];
            if (res && res.errCode === 0) {
                allTime = res.data;

                this.setState({
                    allAvailabeTimes: allTime ? allTime : [],
                })
            }
            // console.log('check get schedule doctor ', res);
        }
    }

    showModal = (time) => {
        this.setState({
            isBookingModal: true,
            dataSchedule: time,
        })
        // console.log('show modal time', time)
    }
    closeModal = () => {
        this.setState({
            isBookingModal: false,
        })
    }
    render() {


        let { allDays, allAvailabeTimes, isBookingModal, dataSchedule } = this.state;
        let { doctorId } = this.props;
        // console.log('doctor id in schedule ', doctorId)
        // console.log('check all available time', allAvailabeTimes);
        console.log('check schedule time ', dataSchedule);
        return (
            <div className="doctor-schedule container">
                <div className="schedule-left">
                    <select onChange={(event) => this.handleOnChangeSlect(event)}>
                        {allDays.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item.value}
                                >
                                    {item.label}
                                </option>
                            )
                        })}


                    </select>
                    <br></br>
                    <br></br>
                    <h2>  <i class="far fa-calendar-alt"></i>Lịch khám bệnh</h2>

                    <div className="calendar">
                        {allAvailabeTimes && allAvailabeTimes.length > 0 &&
                            allAvailabeTimes.map((item, index) => {
                                return (
                                    <button
                                        key={index}
                                        onClick={() => { this.showModal(item) }}
                                    >{item.timeTypeData.valueVi}</button>
                                )
                            })}

                    </div>
                    {allAvailabeTimes && allAvailabeTimes.length > 0
                        ? <span>Đặt lịch tại đây <i class="fas fa-hand-point-up"></i> </span>
                        : <span>Không có lịch khám bệnh vào hôm nay </span>
                    }
                </div>
                <BookingModal
                    isBookingModal={isBookingModal}
                    closeBookingModal={this.closeModal}
                    dataSchedule={dataSchedule}
                    doctorId={doctorId}
                />
                {/* <div style={{ height: '50px' }}></div> */}
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
