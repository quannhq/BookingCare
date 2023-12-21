import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminAction';
import Navbar from '../../HomePage/HeaderHome/Navbar';
import ScheduleDoctor from '../Doctor/ScheduleDoctor';
import ExtraInforDoctor from '../Doctor/ExtraInforDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor'
import { getSpecialtyByIdService } from '../../../services/userService';
import Footer from '../../HomePage/FooterHome/FooterHome'
import './DetailSpecialty.scss';

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // arrSpectialty: [59, 60],
            arrSpectialty: {},
            arrSpectialtyId: [],
            isMore: true,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            // console.log('id in doctor detail', id);
            let res = await getSpecialtyByIdService({
                id: id,
                location: 'ALL'
            });
            // console.log('get a info doctor service', res.data.image);
            this.setState({
                arrSpectialty: res.data,
                arrSpectialtyId: res.data.doctorSpecialty
            })
        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        let { arrSpectialty, arrSpectialtyId, isMore } = this.state
        // console.log('id specialty in detail specialty', this.state)
        return (
            <div className="specialty">
                <div className=" container ">
                    <Navbar />
                    <div className="description">
                        {arrSpectialty && arrSpectialty.length > 0 &&
                            arrSpectialty.descriptionHTML
                            ? arrSpectialty.descriptionHTML :
                            <div className="container" dangerouslySetInnerHTML={{
                                __html: arrSpectialty.descriptionHTML
                            }}>
                            </div>
                        }
                    </div>
                    {arrSpectialtyId && arrSpectialtyId.length > 0 &&
                        arrSpectialtyId.map((item, index) => {
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




                    <div style={{ height: '100px' }}></div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
