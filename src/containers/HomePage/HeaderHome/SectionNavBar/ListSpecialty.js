import React, { Component } from 'react'
import './ListNavBar.scss';
import * as actions from '../../../../store/actions/adminAction';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Navbar from '../Navbar';
import Footer from '../../FooterHome/FooterHome'


class ListSpecialty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            listSpecialty: [],
        }
    }

    componentDidMount() {
        this.props.getSpecialty();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.specialty !== this.props.specialty) {
            this.setState({
                listSpecialty: this.props.specialty
            })
        }

    }
    handerViewDetailSpecialty = (specialty) => {
        this.props.history.push(`/specialtyDetail/${specialty}`)

    }
    render() {
        let listSpecialty = this.state.listSpecialty;
        console.log("all doctor ne: ", listSpecialty)
        return (
            <>
                <Navbar />

                < section className="section container" >
                    <div className="section__header title">
                        <h3>Danh sách chuyên khoa</h3>
                    </div>
                    {listSpecialty.map((item, index) => {

                        console.log(item)
                        return (
                            <div className="sections-content list-nav"
                                onClick={() => { this.handerViewDetailSpecialty(item.id) }}
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
        specialty: state.admin.specialty,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSpecialty: () => dispatch(actions.getSpecialty()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListSpecialty));