import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter';

class ProductManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
        this.listenToEmitter()
    }

    //Dùng emitter để clear data tại form tạo user
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', data => {
            console.log(data)
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: ''
            })
        })
    }

    componentDidMount() {
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

    handleAddNewUser = () => {
        let isValid = this.checkValidate()
        if (isValid === true) {
            this.props.createNewUser(this.state)
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
                    <ModalHeader toggle={() => this.toggle()}>Thêm mới người dùng</ModalHeader>
                    <ModalBody>
                        <div className={"form-input"}>
                            <div className="input-cover">
                                <div className="input-1">
                                    <label>Email</label>
                                    <input
                                        type='email' placeholder='Email'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnchangeInput(event, "email")}
                                    />
                                </div>

                                <div className="input-1">
                                    <label>Password</label>
                                    <input
                                        type='password' placeholder='Password'
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnchangeInput(event, "password")}
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
                        <Button className="btn-submit" color="primary" onClick={() => this.handleAddNewUser()}>Thêm</Button>{' '}
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