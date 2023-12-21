import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminAction';
import Navbar from '../../HomePage/HeaderHome/Navbar'
import './DetailDoctor.scss'
import ScheduleDoctor from './ScheduleDoctor';
import ExtraInforDoctor from './ExtraInforDoctor';
import Footer from '../../HomePage/FooterHome/FooterHome'
import { getAInfoDoctorService } from '../../../services/userService'

class DetailDoctor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            detailDoctor: {},
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            // console.log('id in doctor detail', id);
            let res = await getAInfoDoctorService(id);
            // console.log('get a info doctor service', res.data.image);
            this.setState({
                detailDoctor: res.data,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    getImage = (a) => {


    }

    render() {

        let data = this.state.detailDoctor;
        // console.log(data);
        // console.log("check data render :", data)
        // console.log("check state render:", this.state.dataDoctor)
        let title = ''
        let imageBase64 = ''
        let description = ''
        let post = ''
        if (data && data.positionData && data.firstName && data.lastName) {
            title = `${data.positionData.valueVi}, ${data.firstName} ${data.lastName}`
        }
        if (data && data.image) {
            imageBase64 = new Buffer(data.image, 'base64').toString('binary')
            // console.log('img base 64', imageBase64);
        }
        if (data && data.Markdown) {
            description = data.Markdown.description
            post = data.Markdown.contentHTML
        }
        return (
            <div className="">
                <Navbar />

                <div className="doctor ">
                    <div className="doctor-header container">
                        <div className="doctor-header-img">
                            <img src={data.image}></img>
                        </div>
                        <div className="doctor-header-content">
                            <h2>Giáo sư, tiến sĩ <span>{title}</span></h2>
                            <p> {description} </p>
                        </div>
                    </div>

                    <div className="doctorschedule container">
                        <div className="doctorschedule-left">
                            <ScheduleDoctor
                                doctorId={data.id}
                            />
                        </div>

                        <div className="doctor-schedule-right">
                            <ExtraInforDoctor
                                doctorId={data.id}
                            />
                        </div>

                    </div>
                    <div style={{ height: '5px' }}></div>


                    <div className="doctor-content">
                        <div className="container" dangerouslySetInnerHTML={{ __html: post }}>

                        </div>
                    </div>
                </div>


                {/* <div style={{ height: '10px', backgroundColor: '#a5e0f1' }}></div> */}
                <Footer></Footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
