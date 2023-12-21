import React, { Component, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { dateFormat } from '../../../utils';
import * as actions from '../../../store/actions/adminAction';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import { getListPatientService, sendRemedyService } from '../../../services/userService'
import _ from 'lodash';
import moment from 'moment';
import './PantentManage.scss'
import './ScheduleManage.scss'

class PantentManage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: {},
        }
    }

    async componentDidMount() {
        let { users } = this.props;
        // console.log('tuser in paitent', users);
        let id = users.id;
        let { currentDate } = this.state;
        let dateType = new Date(currentDate).getTime();
        let res = await getListPatientService({
            doctorId: id,
            date: dateType
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeDatePicker = async (date) => {
        this.setState({
            currentDate: date[0]
        })
        let { users } = this.props;
        // console.log('tuser in paitent', users);
        let id = users.id;
        let { currentDate } = this.state;
        let dateType = new Date(currentDate).getTime();
        let res = await getListPatientService({
            doctorId: id,
            date: dateType
        })
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    sendEmailRemedy = async (item) => {
        console.log('>>>>>>>>>>>>>>>>>>', item)
        let data = {
            email: item.patientData.email,
            doctorId: item.doctorId,
            patientId: item.patientId,
            timeType: item.timeType
        }
        let res = await sendRemedyService(data);
        if (res && res.errCode === 0) {
            toast.success('gửi lời cảm ơn thành công')
        }

        //load laij danh sachs 
        let { users } = this.props;
        // console.log('tuser in paitent', users);
        let id = users.id;
        let { currentDate } = this.state;
        let dateType = new Date(currentDate).getTime();
        let res1 = await getListPatientService({
            doctorId: id,
            date: dateType
        })
        if (res1 && res1.errCode === 0) {
            this.setState({
                dataPatient: res1.data
            })
        }
    }

    render() {
        let { dataPatient } = this.state;
        return (
            <Fragment>
                <h3 className="mt-3">
                    QUẢN LÝ BỆNH NHÂN KHÁM BỆNH
                </h3>
                <div className="pantent container">
                    <div className="select-data">
                        <label>Chọn ngày</label>

                        <DatePicker
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}
                        />

                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">STT</th>
                                    <th scope="col">Thời gian</th>
                                    <th scope="col">Họ và Tên</th>
                                    <th scope="col">Địa chỉ</th>
                                    <th scope="col">Giới tính</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.timeTypeDataPatient.valueVi}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.address}</td>
                                                <td>{item.patientData.genderData.valueVi}</td>
                                                <td>
                                                    <button className="btn btn-primary btn-up"
                                                        onClick={() => this.sendEmailRemedy(item)}
                                                    >Xác nhận</button>

                                                </td>
                                            </tr>
                                        )
                                    })
                                    : <th colspan="6"><h3>KHÔNG CÓ LỊCH HẸN VÀO HÔM NAY</h3></th>
                                }


                            </tbody>
                        </table>

                    </div>
                </div>

            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        users: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PantentManage);
