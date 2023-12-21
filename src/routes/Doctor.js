import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ScheduleManage from '../containers/System/Doctor/ScheduleManage'
import PantentManage from '../containers/System/Doctor/PantentManage'

class Doctor extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/doctor/schedule-manage" component={ScheduleManage} />
                        <Route path="/doctor/paitent-manage" component={PantentManage} />
                        {/* <Route component={() => { return (<Redirect to={systemMenuPath} />) }} /> */}
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
