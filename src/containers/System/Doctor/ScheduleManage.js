import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { dateFormat } from '../../../utils';
import * as actions from '../../../store/actions/adminAction';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import _ from 'lodash';
import moment from 'moment';
import { saveBulkScheduleService } from '../../../services/userService'
import './ScheduleManage.scss'

class ScheduleManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedOption: '',
            listDoctors: [],
            currentDate: new Date(),
            scheduleTime: [],
        }
    }

    componentDidMount() {
        this.props.getAllDoctor();
        this.props.getScheduleHour();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataInput = this.inputSeclectData(this.props.allDoctors)
            this.setState({
                listDoctors: dataInput
            })
        }
        if (prevProps.allschedule !== this.props.allschedule) {
            let data = this.props.allschedule;
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                scheduleTime: data
            })
        }
    }
    inputSeclectData = (inputData) => {
        let result = [];
        if (inputData) {
            inputData.map((item, key) => {
                let object = {};
                let labelName = `${item.firstName} ${item.lastName}`;
                object.label = labelName;
                object.value = item.id;
                result.push(object);
            })
        }
        return result;
    }
    handleChange = async (selectedOption) => {
        this.setState({
            selectedOption: selectedOption,
        });

    };
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    onHandleClickBtnTime = (time) => {
        let { scheduleTime } = this.state;
        if (scheduleTime && scheduleTime.length > 0) {
            scheduleTime = scheduleTime.map(item => {
                if (item.id === time.id) item.isSelected = !item.isSelected;
                return item;

            })
            this.setState({
                scheduleTime: scheduleTime
            })
        }
    }
    saveSchedule = async () => {
        let { scheduleTime, currentDate, selectedOption } = this.state
        let result = [];
        if (!currentDate) {
            toast.error("not time date")
        }
        if (selectedOption && _.isEmpty(selectedOption)) {
            toast.error("not chose doctor")
        }
        let formatedDate = new Date(currentDate).getTime();

        if (scheduleTime && scheduleTime.length > 0) {
            let selectTime = scheduleTime.filter(item => item.isSelected === true)

            if (selectTime && selectTime.length > 0) {
                selectTime.map((item, i) => {
                    let object = {};
                    object.doctorId = selectedOption.value;
                    object.date = formatedDate;
                    object.timeType = item.keyMap;
                    result.push(object);
                })

            } else {
                toast.error("not select time ");
                return;
            }
        }
        let res = await saveBulkScheduleService({
            arrSchedule: result,
            doctorId: selectedOption.value,
            date: formatedDate
        })
        if (res && res.errCode === 0) {
            toast.success("Đặt lịch thành công")
        }

    }

    render() {
        let { scheduleTime } = this.state;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        let { allschedule } = this.props;
        return (
            <Fragment>
                <h3 className="mt-3">
                    ĐẶT LỊCH BÁC SỸ
                </h3>
                <div className="select container">
                    <div className="select-doctor">
                        <label className="">Chọn bác sỹ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.listDoctors}
                            placeholder={'Chọn bác sĩ'}
                        />
                    </div>
                    <div className="select-data">
                        <label>Chọn ngày</label>

                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}
                            minDate={yesterday}
                        />

                    </div>
                </div>
                <div className="schedule container">
                    <div className="schedule-time">
                        {scheduleTime && scheduleTime.length > 0 &&
                            scheduleTime.map((item, i) => {
                                return (
                                    <button key={i} className={item.isSelected === true ? 'btn-schedule active' : 'btn-schedule'}
                                        onClick={() => this.onHandleClickBtnTime(item)}
                                    >{item.valueEn}</button>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="container">
                    <button className="btn-save"
                        onClick={() => this.saveSchedule()}
                    >Lưu thông tin</button>
                </div>
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        allDoctors: state.admin.allDoctors,
        isLoggedIn: state.user.isLoggedIn,
        allschedule: state.admin.schedule,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctor: () => dispatch(actions.getAllDoctor()),
        getScheduleHour: () => dispatch(actions.getScheduleHour()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleManage);
