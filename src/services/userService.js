import axios from "../axios";
import { toast } from 'react-toastify';
const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email: email, password: password });
}
const createNewUserService = (data) => {
    // console.log('check data server ' + data);
    toast.success('create new user')
    return axios.post('/api/create-new-user', data);
}
const getAllUsersService = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}
const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user', {
        data: { id: userId }
    });
}
const editUserService = (userId) => {
    return axios.put('/api/edit-user', userId);
}
const getTopDocterHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}
const getAllDoctorService = (inputId) => {
    return axios.get(`/api/get-all-doctors?id=${inputId}`);
}
//get a informatiom of doctor by id
const getAInfoDoctorService = (inputId) => {
    return axios.get(`/api/get-all-info-detail-doctors?id=${inputId}`);
}

const createInfoDoctorService = (data) => {
    // console.log('check data server ' + data);
    toast.success('crate info doctor success');
    return axios.post('/api/save-info-doctors', data);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/allcode?type=${inputType}`);
}
const saveBulkScheduleService = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data);
}
const getExtraInfoDoctorService = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
}
const getProfileDoctorService = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}
const saveBookingService = (data) => {
    return axios.post(`/api/patient-booking`, data);
}
// lưu chuyên khoa 
const saveSpecailtyService = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
}
// get all specialty
const getAllSpecialtyService = () => {
    return axios.get(`/api/get-specialty`);
}
//get specialty by id
const getSpecialtyByIdService = (data) => {
    return axios.get(`/api/get-infor-specialty-by-id?id=${data.id}&location=${data.location}`);
}
//save clinic 
const saveClinicService = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
}
const getAllClinicService = () => {
    return axios.get(`/api/get-clinic`);
}
const getClinicByIdService = (data) => {
    return axios.get(`/api/get-infor-clinic-by-id?id=${data.id}`);
}
//get list  patient
const getListPatientService = (data) => {
    return axios.get(`/api/get-list-patient?doctorId=${data.doctorId}&date=${data.date}`);
}
//send remedy email /api/send-remedy
const sendRemedyService = (data) => {
    return axios.post(`/api/send-remedy`, data);
}
export {
    handleLoginApi, createNewUserService, getAllUsersService,
    deleteUserService, editUserService, getTopDocterHomeService,
    getAllDoctorService, createInfoDoctorService, getAInfoDoctorService,
    getAllCodeService, saveBulkScheduleService, getScheduleDoctorByDate,
    getExtraInfoDoctorService, getProfileDoctorService, saveBookingService,
    saveSpecailtyService, getAllSpecialtyService, getSpecialtyByIdService, saveClinicService,
    getAllClinicService, getClinicByIdService, getListPatientService, sendRemedyService
}







