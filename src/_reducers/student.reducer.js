import { studentConstants } from '../_constants';

const intialState = {
    enrollmentRequest: {
        "User_Request_Id": 0,
        "Request_Type_Id": 1,
        "Request_Status_Type_Code_Id": 3,
        "User_Id": 0,
        "Comments": ''
    },
    enrollmentRequestStatus: [],
    courseStatus: []
}

export function studentReducer(state = {...intialState }, action) {
    switch (action.type) {
        case studentConstants.ENROLL_STUDENT_SUCCESS:
            return {
                ...state,
                enrollmentRequest: intialState.enrollmentRequest,

            };
        case studentConstants.ENROLL_STUDENT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case studentConstants.ENROLLMENT_REQUEST_STATUS_SUCCESS:
            return {
                ...state,
                enrollmentRequestStatus: action.enrollmentStatus,
            };
        case studentConstants.ENROLLMENT_REQUEST_STATUS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case studentConstants.STUDENT_COURSE_STATUS_SUCCESS:
            return {
                ...state,
                courseStatus: action.courseStatus,
            };
        case studentConstants.STUDENT_COURSE_STATUS_FAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state
    }
}