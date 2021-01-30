import { examConstants } from '../_constants';

export function examReducer(state = {}, action) {
    switch (action.type) {
        case examConstants.GETALL_EXAM_REQUEST:
            return {
                ...state,
                loading: true
            };
        case examConstants.GETALL_EXAM_SUCCESS:
            return {
                ...state,
                exams: action.exams,
                loading: false
            };
        case examConstants.GETALL_EXAM_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false
            };

        case examConstants.ADD_EXAMREQUEST:
            return {
                ...state,
            };
        case examConstants.ADD_EXAMSUCCESS:
            return {
                ...state,
                exam: action.exam
            };
        case examConstants.ADD_EXAMFAILURE:
            return {
                ...state,
                error: action.error
            };

        default:
            return state
    }
}