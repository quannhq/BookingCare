import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import "./Login.scss";
import { FormattedMessage } from 'react-intl';



class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }
    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }
    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }
    handleLogin = () => {
     console.log('usename: ',this.state.username,'password: ',this.state.password );
     console.log('all state: ',this.state);
    }
    handleShowHidePassword = () => {
        let x = document.querySelector('.custom-input-password input');
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    render() {
        
        return (
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>
                                Username:
                            </label>
                            <input type='text' 
                                className='form-control' 
                                placeholder='Enter your name' 
                                value={this.state.username} 
                                onChange={(event) => this.handleOnChangeUsername(event)} 
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>
                                Password:
                            </label>
                           
                            <div className='custom-input-password'>
                                <input 
                                type='password' 
                                className='form-control' 
                                placeholder='Enter your password'
                                onChange={(event) => this.handleOnChangePassword(event)}
                                />
                                <i class="far fa-eye"></i>
                                <span onClick={() => this.handleShowHidePassword()}>
                                <i class="fas fa-eye-slash"></i>
                                </span>
                            </div>
                        </div>
                       <div className='col-12 ' > 
                            <button className='btn-login' onClick={()=>{this.handleLogin()}} >Login</button>
                       </div>
                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-4'>
                            <span className='text-other-login'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
