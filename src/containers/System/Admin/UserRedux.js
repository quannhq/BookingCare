import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminAction';
import UsersTable from './UsersTable';
import { CRUD_ACTION } from '../../../utils/constant';
import CommonUtils from '../../../utils/CommonUtils';
class UserRedux extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            positionId: '',
            roleId: '',
            avatar: '',
            previewUrl: '',
            userEditId: '',

            action: '',
        }
    }

    async componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                positionId: '',
                roleId: '',
                avatar: '',

                action: CRUD_ACTION.CREATE,
            })
        }
    }
    onCreateUser = () => {
        // event.preventDefault();
        // console.log('check state when create user', this.state)
        let isValid = this.onCheckValidity();
        if (isValid === false) return;
        let { action } = this.state;

        if (action === CRUD_ACTION.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                avatar: this.state.avatar,
                //chưa thực hiện upload anh
                roleId: this.state.roleId,
                positionId: this.state.positionId,
            })
            setTimeout(() => {
                this.props.getAllUsers()
            }, 1000);
        }

        if (action === CRUD_ACTION.EDIT) {
            this.props.editAUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                //avatar: this.stateTypes.STRING,
                //chưa thực hiện upload anh
                roleId: this.state.roleId,
                positionId: this.state.positionId,
            })
            setTimeout(() => {
                this.props.getAllUsers()
            }, 1000);
        }

    }
    onCheckValidity = () => {
        let isValid = true;
        let checkArr = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address', 'gender', 'positionId', 'roleId'];
        for (let i = 0; i < checkArr.length; i++) {
            if (!this.state[checkArr[i]]) {
                isValid = false;
                alert('Please enter a valid ' + checkArr[i])
                break;
            }
        }
        return isValid;
    }
    onChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        });
    }
    editUser = (user) => {

        this.setState({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            positionId: user.positionId,
            roleId: user.roleId,
            avatar: user.avatar,
            userEditId: user.id,
            action: CRUD_ACTION.EDIT,
        })
    }

    onChangeImage = async (event) => {
        let data = event.target.files;
        // console.log(data)
        let file = data[0];
        // console.log(file)
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            // console.log(base64);
            let objectURL = URL.createObjectURL(file);
            console.log(objectURL)
            this.setState({
                previewUrl: objectURL,
                avatar: base64,
            })
        }
    }

    render() {
        let { email, password, firstName, lastName, phoneNumber, address,
            gender, positionId, roleId, action, avatar } = this.state;
        return (
            <div className="container">
                <h3 className="mt-3">
                    Thêm mới bác sĩ
                </h3>


                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input type="email" className="form-control"
                            id="inputEmail4" placeholder="Email"
                            value={email}
                            onChange={(event) => { this.onChangeInput(event, 'email') }}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">Password</label>
                        <input type="password" className="form-control"
                            id="inputPassword4" placeholder="Password"
                            value={password}
                            onChange={(event) => { this.onChangeInput(event, 'password') }}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Họ</label>
                    <input type="text" className="form-control"
                        id="inputAddress" placeholder="Nguyễn "
                        value={firstName}
                        onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Tên</label>
                    <input type="text" className="form-control"
                        id="inputAddress2" placeholder="Văn A"
                        value={lastName}
                        onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Địa chỉ</label>
                    <input type="text" className="form-control"
                        id="inputAddress2" placeholder="Thành phố Hồ Chí Minh"
                        value={address}
                        onChange={(event) => { this.onChangeInput(event, 'address') }}
                    />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Số điện thoại</label>
                        <input type="text" className="form-control" id="inputCity"
                            value={phoneNumber}
                            onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                        />
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputState">Giới tính</label>
                        <select id="inputState" className="form-control"
                            onChange={(event) => { this.onChangeInput(event, 'gender') }}
                            value={gender}
                        >
                            <option selected>Choose...</option>
                            <option value="M" >Nam</option>
                            <option value="F" >Nữ</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputState">Chức danh</label>
                        <select id="inputState" className="form-control"
                            onChange={(event) => { this.onChangeInput(event, 'positionId') }}
                            value={positionId}
                        >
                            <option selected>Choose...</option>
                            <option value="P2">Tiến sĩ</option>
                            <option value="P1">Thạc sĩ</option>
                            <option value="P3">Phó giáo sư</option>
                            <option value="P4">Giáo sư</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputState">Vai trò</label>
                        <select id="inputState" className="form-control"
                            onChange={(event) => { this.onChangeInput(event, 'roleId') }}
                            value={roleId}
                        >
                            <option selected>Choose...</option>
                            <option value="R1">Admin</option>
                            <option value="R2">Bác sĩ</option>
                            <option value="R3">Bệnh nhân</option>
                        </select>
                    </div>

                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlFile1">Ảnh Đại diện</label>
                    <input type="file" className="form-control-file" id="exampleFormControlFile1"
                        onChange={(event) => { this.onChangeImage(event) }}
                    // value={avatar}
                    />
                </div>


                <button type="submit" className={action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"}
                    onClick={() => this.onCreateUser()}
                >{action === CRUD_ACTION.EDIT ? "Lưu lại" : "Đăng ký"}</button>


                <UsersTable
                    editUser={this.editUser}
                />

                <div style={{ height: '100px' }}></div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        getAllUsers: () => dispatch(actions.getAllUsers()),
        editAUser: (id) => dispatch(actions.editAUser(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
