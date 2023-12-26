import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./UserManage.scss"
import { getAllUsersService, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import { emitter } from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allUsers: [],
            isModalOpen: false,
            isModalEditOpen: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact()
    }

    getAllUserFromReact = (async () => {
        let response = await getAllUsersService('ALL')
        if (response && response.errCode === 0) {
            this.setState({
                allUsers: response.users
            })
        }
    })

    handleAddUser = (() => {
        this.setState({
            isModalOpen: true
        })
    })

    toggleModal = (() => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    })

    toggleModalEdit = (() => {
        this.setState({
            isModalEditOpen: !this.state.isModalEditOpen
        })
    })

    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                this.getAllUserFromReact()
                this.toggleModal()
                emitter.emit('EVENT_CLEAR_MODAL_DATA', { 'id': 'your id' })
            }
        } catch (e) {
            console.log(e)
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let response = await deleteUserService(user.id)
            console.log("check response: ", response)
            if (response && response.errCode !== 0) {
                alert('Xoá không thành công')
            } else {
                this.getAllUserFromReact()
            }
        }
        catch (e) {
            console.log(e)
        }
    }

    handleEditUser = ((user) => {

        this.setState({
            userEdit: user,
            isModalEditOpen: true,

        }, () => {
            console.log('check user state edit user manage: ', this.state.userEdit)
        })

    })


    editUser = async (data) => {
        try {
            let response = await editUserService(data)
            console.log('check res: ', response)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                this.getAllUserFromReact()
                this.toggleModalEdit()
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {

        return (
            <>
                <ModalUser
                    isOpen={this.state.isModalOpen}
                    toggleModal={this.toggleModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isModalEditOpen &&
                    <ModalEditUser
                        isOpen={this.state.isModalEditOpen}
                        toggleModal={this.toggleModalEdit}
                        userEdit={this.state.userEdit}
                        editUser={this.editUser}
                    />}
                <div className="container">
                    <button className=" btn btn-add-user container" onClick={() => this.handleAddUser()}>
                        <i className="fas fa-plus"></i>
                        Thêm mới người dùng
                    </button>
                </div>
                <div className="container text-center">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <div className='btn-cover'>
                                                <button onClick={() => this.handleEditUser(item)}><i className="btn-edit fas fa-edit"></i></button>
                                                <button onClick={() => this.handleDeleteUser(item)}><i className="btn-delete fas fa-trash-alt"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);