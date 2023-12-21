import React, { Component } from 'react'
import './ListNavBar.scss';
import * as actions from '../../../../store/actions/adminAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Navbar from '../Navbar'
import Footer from '../../FooterHome/FooterHome'

class ListClinic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listClinic: [],
        }
    }

    componentDidMount() {
        this.props.getClinic();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.clinic !== this.props.clinic) {
            this.setState({
                listClinic: this.props.clinic
            })
        }

    }
    handerViewDetailClinic = (clinic) => {
        // console.log(doctor)
        this.props.history.push(`/clinicDetail/${clinic}`)

    }
    render() {
        let listClinic = this.state.listClinic;
        console.log("all doctor ne: ", listClinic)
        return (
            <>
                <Navbar />
                < section className="section container" >

                    <div className="section__header title">
                        <h3>Danh sách phòng khám</h3>
                    </div>
                    {listClinic.map((item, index) => {

                        return (
                            <div className="sections-content list-nav"
                                onClick={() => { this.handerViewDetailClinic(item.id) }}
                            >
                                < img className='avatar' src={item.image} alt="" />
                                <p className='name'>{item.name}</p>
                            </div>
                        )
                    })}

                </section >
                <Footer />
            </>

        )
    }
}

const mapStateToProps = state => {
    return {
        clinic: state.admin.clinic
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getClinic: () => dispatch(actions.getClinic()),
    };
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListClinic));

