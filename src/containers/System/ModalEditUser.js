import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        let user = this.props.userEdit
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: '123456',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address
            })
        }
    }



    toggle = () => {
        this.props.toggleModal()
    }

    handleOnchangeInput = (event, id) => {
        let coppyState = { ...this.state }
        coppyState[id] = event.target.value
        this.setState({
            ...coppyState
        })
    }

    checkValidate = () => {
        let checkInput = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                checkInput = false
                alert(`Thiếu thông tin ${arrInput[i]}`)
                break
            }
        }
        return checkInput
    }

    handleEditUser = () => {
        let isValid = this.checkValidate()
        if (isValid === true) {
            this.props.editUser(this.state)
        }
    }
    render() {

        return (
            < div >
                <Modal isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    className={'modal-user-container'}
                    size="lg"
                    centered
                >
                    <ModalHeader toggle={() => this.toggle()}>Cập nhật thông tin người dùng</ModalHeader>
                    <ModalBody>
                        <div className={"form-input"}>
                            <div className="input-cover">
                                <div className="input-1">
                                    <label>Email</label>
                                    <input
                                        type='email' placeholder='Email'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, "email")}
                                        disabled
                                    />
                                </div>

                                <div className="input-1">
                                    <label>Password</label>
                                    <input
                                        type='password' placeholder='Password'
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnchangeInput(event, "password")}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="input-cover">
                                <div className="input-1">
                                    <label>First Name</label>
                                    <input
                                        type='text' placeholder='First name'
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleOnchangeInput(event, "firstName")}
                                    />
                                </div>
                                <div className="input-1">
                                    <label>Last Name</label>
                                    <input
                                        type='text' placeholder='Last name'
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleOnchangeInput(event, "lastName")}
                                    />
                                </div>
                            </div>
                            <div className="input-2">
                                <label>Address</label>
                                <input
                                    type='text' placeholder='Address'
                                    value={this.state.address}
                                    onChange={(event) => this.handleOnchangeInput(event, "address")}
                                />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn-submit" color="primary" onClick={() => this.handleEditUser()}>Cập nhật</Button>{' '}
                        <Button className="btn-cancel" color="secondary" onClick={() => this.toggle()}>Hủy</Button>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);