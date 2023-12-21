import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminAction';
import Navbar from '../../HomePage/HeaderHome/Navbar';
import { getExtraInfoDoctorService } from '../../../services/userService'
import NumberFormat from 'react-number-format';
import './DetailDoctor.scss'
import './ExtraInforDoctor.scss'

class ExtraInforDoctor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isTable: false,
            dataExtraInfo: {}
        }
    }

    async componentDidMount() {
        let res = await getExtraInfoDoctorService(this.props.doctorId)
        // console.log('data in extra data', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataExtraInfo: res.data,
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let res = await getExtraInfoDoctorService(this.props.doctorId)
            // console.log('data in extra data', res)
            if (res && res.errCode === 0) {
                this.setState({
                    dataExtraInfo: res.data,
                })
            }

        }
    }
    showTable = () => {
        this.setState({
            isTable: !this.state.isTable
        })
        // console.log('state: ', this.state)
    }

    render() {
        let { isTable, dataExtraInfo } = this.state;
        // console.log('render data ExtraInforDoctor ', dataExtraInfo.paymentTypeData);

        return (
            <div className="doctor-extra container">
                <div className="content-up">
                    <h3><b>ĐỊA CHỈ KHÁM </b></h3>
                    <div className='extra-info'>{dataExtraInfo.nameClinic}</div>
                    <div className='extra-info'>{dataExtraInfo.addressClinic}</div>
                </div>
                <div className="content-down">
                    <div className="content-down-left"><b>Giá khám:
                        <NumberFormat
                            value={dataExtraInfo && dataExtraInfo.priceTypeData ? dataExtraInfo.priceTypeData.valueVi : ''}
                            thousandSeparator={true}
                            suffix={'VND'}
                            displayType={'text'}
                        />
                    </b>  </div>
                    {isTable === false &&

                        <p onClick={this.showTable}> <i>Xem chi tiết</i></p>

                    }
                    {isTable === true &&
                        <table className="">
                            <tr>
                                <td>Giá khám
                                    <br />
                                    <span>Giảm giá 20% khi đặt tại đây</span>
                                </td>
                                <td>
                                    <NumberFormat
                                        value={dataExtraInfo && dataExtraInfo.priceTypeData ? dataExtraInfo.priceTypeData.valueVi : ''}
                                        thousandSeparator={true}
                                        suffix={'VND'}
                                        displayType={'text'}
                                    />
                                </td>

                            </tr>
                            <tr>
                                <td colspan="2">Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt và quẹt thẻ </td>

                            </tr>
                            <tr>
                                <td> </td>
                                <td > <p onClick={this.showTable}><i>Ẩn bảng giá</i></p></td>
                            </tr>
                        </table>
                    }

                </div>
                <div style={{ height: '50px' }}></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ExtraInforDoctor);
