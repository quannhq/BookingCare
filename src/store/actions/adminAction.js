import actionTypes from './actionTypes';
import {
    createNewUserService, getAllUsersService, deleteUserService,
    editUserService, getTopDocterHomeService, getAllDoctorService, createInfoDoctorService,
    getAInfoDoctorService, getAllCodeService, getAllSpecialtyService, getAllClinicService
} from '../../services/userService'

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS
})

//create user success 
export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log(data)
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(userCreateSuccess())
                dispatch(getAllUsers());
            } else {
                dispatch(userCreateFail())
            }
        } catch (e) {
            dispatch(userCreateFail())
            console.log('create user failed ' + e)
        }
    }
}
export const userCreateSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const userCreateFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,

})
//get all users 
export const getAllUsers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsersService("ALL");
            if (res && res.errCode === 0) {
                dispatch(getAllUsersSuccess(res.users.reverse()))
            } else {
                dispatch(getAllUsersFail())
            }
        } catch (e) {
            dispatch(getAllUsersFail())
            console.log('create user failed ' + e)
        }
    }
}
export const getAllUsersSuccess = (data) => ({
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    users: data
})
export const getAllUsersFail = () => ({
    type: actionTypes.GET_ALL_USERS_FAIL,

})

// delete user 
export const deleteUsers = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(data);
            if (res && res.errCode === 0) {
                alert('delete success')
                dispatch(deleteUserSuccess())
                dispatch(getAllUsers());
            } else {
                dispatch(deleteUserFail())
            }
        } catch (e) {
            dispatch(deleteUserFail())
            console.log('delete user failed ' + e)
        }
    }
}
export const deleteUserSuccess = (id) => ({
    type: actionTypes.DELETE_USER_SUCCESS,
    users: id
})
export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,

})

//edit user success 
export const editAUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(userEditSuccess())
                dispatch(getAllUsers());
            } else {
                dispatch(userEditFail())
            }
        } catch (e) {
            dispatch(userEditFail())
            console.log('create user failed ' + e)
        }
    }
}
export const userEditSuccess = (id) => ({
    type: actionTypes.EDIT_USER_SUCCESS,
    users: id
})
export const userEditFail = () => ({
    type: actionTypes.EDIT_USER_FAIL,

})

//get top doctor info
export const getTopDoctor = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getTopDocterHomeService('6');
            // console.log('top doctor', res)
            if (res && res.errCode === 0) {
                dispatch(getTopDoctorsSuccess(res.data))
            } else {
                dispatch(getTopDoctorFail())
            }
        } catch (e) {
            dispatch(getTopDoctorFail())
            console.log('get top doctor failed ' + e)
        }
    }
}
export const getTopDoctorsSuccess = (data) => ({
    type: actionTypes.GET_TOP_DOCTORS_SUCCESS,
    dataDoctors: data
})
export const getTopDoctorFail = () => ({
    type: actionTypes.GET_TOP_DOCTORS_FAIL,

})

//get all doctor  
export const getAllDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctorService("ALL");
            // console.log(res.data)
            if (res && res.errCode === 0) {
                dispatch(getAllDoctorSuccess(res.data))
            } else {
                dispatch(getAllDoctorFail())
            }
        } catch (e) {
            dispatch(getAllDoctorFail())
            console.log('get all doctor fail' + e)
        }
    }
}

export const getAllDoctorSuccess = (data) => ({
    type: actionTypes.GET_ALL_DOCTORS_SUCCESS,
    allDoctors: data
})
export const getAllDoctorFail = () => ({
    type: actionTypes.GET_ALL_DOCTORS_FAIL,

})
//get one doctor by id 
export const getADoctor = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAInfoDoctorService(doctorId);
            console.log(res.data)
            if (res && res.errCode === 0) {
                dispatch(getADoctorSuccess(res.data))
            } else {
                dispatch(getADoctorFail())
            }
        } catch (e) {
            dispatch(getADoctorFail())
            console.log('get a doctor fail' + e)
        }
    }
}

export const getADoctorSuccess = (data) => ({
    type: actionTypes.GET_A_DOCTORS_SUCCESS,
    aDoctor: data
})
export const getADoctorFail = () => ({
    type: actionTypes.GET_A_DOCTORS_FAIL,

})
//post doctor info
export const createInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            // console.log(data)
            let res = await createInfoDoctorService(data);
            if (res && res.errCode === 0) {
                // alert('taoj thoong tin thanh bac si thanh cong ')
                dispatch(createInfoDoctorSuccess())
            } else {
                dispatch(createInfodoctorFail())
            }
        } catch (e) {
            dispatch(createInfodoctorFail())
            console.log('create user failed ' + e)
        }
    }
}
export const createInfoDoctorSuccess = () => ({
    type: actionTypes.CREATE_INFO_DOCTOR_SUCCESS,
})
export const createInfodoctorFail = () => ({
    type: actionTypes.CREATE_INFO_DOCTOR_FAIL,

})

//get all schedule 
export const getScheduleHour = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("TIME");
            // console.log(res.data)
            if (res && res.errCode === 0) {
                dispatch(getScheduleHourSuccess(res.data))
            } else {
                dispatch(getScheduleHourFail())
            }
        } catch (e) {
            dispatch(getScheduleHourFail())
            console.log('get  fail' + e)
        }
    }
}

export const getScheduleHourSuccess = (data) => ({
    type: actionTypes.GET_ALLCODE_HOUR_SUCCESS,
    scheduleData: data
})
export const getScheduleHourFail = () => ({
    type: actionTypes.GET_ALLCODE_HOUR_FAIL,

})
//get all province
export const getProvince = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PROVINCE");
            // console.log(res.data)
            if (res && res.errCode === 0) {
                dispatch(getProvinceSuccess(res.data))
            } else {
                dispatch(getProvinceFail())
            }
        } catch (e) {
            dispatch(getProvinceFail())
            console.log('get  fail' + e)
        }
    }
}
export const getProvinceSuccess = (data) => ({
    type: actionTypes.GET_PROVINCE_SUCCESS,
    provinceData: data
})
export const getProvinceFail = () => ({
    type: actionTypes.GET_PROVINCE_FAIL,

})
// get price
export const getPrice = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PRICE");
            // console.log(res.data)
            if (res && res.errCode === 0) {
                dispatch(getPriceSuccess(res.data))
            } else {
                dispatch(getPriceFail())
            }
        } catch (e) {
            dispatch(getPriceFail())
            console.log('get  fail' + e)
        }
    }
}
export const getPriceSuccess = (data) => ({
    type: actionTypes.GET_PRICE_SUCCESS,
    priceData: data
})
export const getPriceFail = () => ({
    type: actionTypes.GET_PRICE_FAIL,

})
//get payment
export const getPayment = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("PAYMENT");
            // console.log(res.data)
            if (res && res.errCode === 0) {
                dispatch(getPaymentSuccess(res.data))
            } else {
                dispatch(getPaymentFail())
            }
        } catch (e) {
            dispatch(getPaymentFail())
            console.log('get  fail' + e)
        }
    }
}
export const getPaymentSuccess = (data) => ({
    type: actionTypes.GET_PAYMENT_SUCCESS,
    paymentData: data
})
export const getPaymentFail = () => ({
    type: actionTypes.GET_PAYMENT_FAIL,

})
// get Specialty
export const getSpecialty = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllSpecialtyService();
            // console.log(res.data)
            if (res && res.errCode === 0) {
                dispatch(getSpecialtySuccess(res.data))
            } else {
                dispatch(getSpecialtyFail())
            }
        } catch (e) {
            dispatch(getSpecialtyFail())
            console.log('get  fail' + e)
        }
    }
}
export const getSpecialtySuccess = (data) => ({
    type: actionTypes.GET_SPECIALTY_SUCCESS,
    specialtyData: data
})
export const getSpecialtyFail = () => ({
    type: actionTypes.GET_SPECIALTY_FAIL,

})
//get Clinic 
export const getClinic = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllClinicService();
            // console.log(res.data)
            if (res && res.errCode === 0) {
                dispatch(getClinicSuccess(res.data))
            } else {
                dispatch(getClinicFail())
            }
        } catch (e) {
            dispatch(getClinicFail())
            console.log('get  fail' + e)
        }
    }
}
export const getClinicSuccess = (data) => ({
    type: actionTypes.GET_CLINIC_SUCCESS,
    clinicData: data
})
export const getClinicFail = () => ({
    type: actionTypes.GET_CLINIC_FAIL,

})