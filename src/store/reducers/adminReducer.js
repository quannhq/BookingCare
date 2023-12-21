import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    adminInfo: null,
    users: [],
    topDoctors: [],
    allDoctors: [],
    aDoctors: [],
    schedule: [],
    province: [],
    price: [],
    payment: [],
    specialty: [],
    clinic: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                adminInfo: action.adminInfo
            }
        case actionTypes.ADMIN_LOGIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.PROCESS_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                adminInfo: null
            }
        case actionTypes.GET_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USERS_FAIL:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.GET_TOP_DOCTORS_FAIL:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.allDoctors;
            // console.log(state.allDoctors)
            return {
                ...state,
            }
        case actionTypes.GET_ALL_DOCTORS_FAIL:
            state.allDoctors = [];
            return {
                ...state,
            }
        case actionTypes.GET_A_DOCTORS_SUCCESS:
            state.aDoctors = action.aDoctor;
            console.log(state.aDoctors)
            return {
                ...state,
            }
        case actionTypes.GET_A_DOCTORS_FAIL:
            state.aDoctors = [];
            return {
                ...state,
            }
        case actionTypes.GET_ALLCODE_HOUR_SUCCESS:
            state.schedule = action.scheduleData;
            // console.log(state.schedule)
            return {
                ...state,
            }
        case actionTypes.GET_ALLCODE_HOUR_FAIL:
            state.schedule = [];
            return {
                ...state,
            }
        case actionTypes.GET_PROVINCE_SUCCESS:
            state.province = action.provinceData;
            // console.log(state.province)
            return {
                ...state,
            }
        case actionTypes.GET_PROVINCE_FAIL:
            state.province = [];
            return {
                ...state,
            }
        case actionTypes.GET_PRICE_SUCCESS:
            state.price = action.priceData;
            // console.log(state.price)
            return {
                ...state,
            }
        case actionTypes.GET_PRICE_FAIL:
            state.price = [];
            return {
                ...state,
            }
        case actionTypes.GET_PAYMENT_SUCCESS:
            state.payment = action.paymentData;
            // console.log(state.payment)
            return {
                ...state,
            }
        case actionTypes.GET_PAYMENT_FAIL:
            state.payment = [];
            return {
                ...state,
            }
        //get specialty
        case actionTypes.GET_SPECIALTY_SUCCESS:
            state.specialty = action.specialtyData;
            // console.log(state.specialty)
            return {
                ...state,
            }
        case actionTypes.GET_SPECIALTY_FAIL:
            state.specialty = [];
            return {
                ...state,
            }
        //GET CLINIC
        case actionTypes.GET_CLINIC_SUCCESS:
            state.clinic = action.clinicData;
            // console.log(state.specialty)
            return {
                ...state,
            }
        case actionTypes.GET_CLINIC_FAIL:
            state.clinic = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default appReducer;