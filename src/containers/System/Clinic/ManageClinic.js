import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/adminAction';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import './ManageClinic.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { saveClinicService } from '../../../services/userService'
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClinic extends Component {

    constructor(props) {
        super(props);

        this.state = {
            nameClinic: '',
            nameAddress: '',
            contentHTML: '',
            contentMarkdown: '',
            previewUrl: '',
            imageBase64: '',
        }
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    onChangeInput = (event) => {
        let description = event.target.value;
        let name = event.target.name
        // console.log(description);
        this.setState({
            [name]: description
        });
        // console.log('set state input ', this.state)
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });

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
                imageBase64: base64,
            })
        }
    }
    handleSaveDoctor = async () => {
        let res = await saveClinicService({
            name: this.state.nameClinic,
            imageBase64: this.state.imageBase64,
            address: this.state.nameAddress,
            descriptionHTML: this.state.contentHTML,
            descriptionMarkdown: this.state.contentMarkdown,
        })
        if (res && res.errCode === 0) {
            toast.success('save information clinic susscess')
        } else {
            toast.error('save information clinic error')
        }
        console.log(this.state)
        this.setState({
            nameClinic: '',
            nameAddress: '',
            contentHTML: '',
            contentMarkdown: '',
            previewUrl: '',
            imageBase64: '',
        })
    }
    render() {

        return (
            <div className="container">
                <h3 className="mt-3">
                    QUẢN LÝ PHÒNG KHÁM
                </h3>

                <div className="manage-spacialty">
                    <div className="manage-spacialty-4">
                        <label>Tên phòng khám </label><br />
                        <input name="nameClinic"
                            onChange={this.onChangeInput}
                            value={this.state.nameClinic}
                            className="form-control"
                        ></input>
                    </div>
                    <div className="manage-spacialty-5">
                        <label>Thêm ảnh </label><br />
                        <input name="image"
                            className="form-control-file" id="exampleFormControlFile1"
                            type="file"
                            onChange={(event) => { this.onChangeImage(event) }}
                        ></input>
                    </div>


                </div>
                <div className="manage-spacialty-44">
                    <label>Địa chỉ phòng khám  </label><br />
                    <input name="nameAddress"
                        onChange={this.onChangeInput}
                        value={this.state.nameAddress}
                        className="form-control"
                    ></input>
                </div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)}
                    onChange={this.handleEditorChange}
                    value={this.state.contentMarkdown} />

                <button className="manage-doctor-btn" onClick={() => this.handleSaveDoctor()}>
                    Lưu thông tin
                </button>
                <div style={{ height: '100px' }}></div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
