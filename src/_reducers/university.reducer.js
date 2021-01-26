import { universityConstants } from '../_constants';

export function departmentsReducer(state = {}, action) {
    switch (action.type) {
        case universityConstants.GETALL_DEPARTMENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case universityConstants.GETALL_DEPARTMENTS_SUCCESS:
            return {
                ...state,
                departments: action.departments
            };
        case universityConstants.GETALL_DEPARTMENTS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case universityConstants.GETALL_DEPARTMENTS_ADMINS_REQUEST:
            return {
                ...state,
            };
        case universityConstants.GETALL_DEPARTMENTS_ADMINS_SUCCESS:
            return {
                ...state,
                departmentAdmins: action.departmentAdmins
            };
        case universityConstants.GETALL_DEPARTMENTS_ADMINS_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case universityConstants.EDIT_DEPARTMENT_REQUEST:
            return {
                ...state,
            };
        case universityConstants.EDIT_DEPARTMENT_SUCCESS:
            return {
                ...state,
                department: action.department
            };
        case universityConstants.EDIT_DEPARTMENT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case universityConstants.ADD_DEPARTMENT_REQUEST:
            return {
                ...state,
            };
        case universityConstants.ADD_DEPARTMENT_SUCCESS:
            return {
                ...state,
                department: action.department
            };
        case universityConstants.ADD_DEPARTMENT_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case universityConstants.DELETE_DEPARTMENT_REQUEST:
            // add 'deleting:true' property to department being deleted
            return {
                ...state,
                departments: state.departments.map(department =>
                    department.Department_Id === action.Department_Id ? {...department, deleting: true } :
                    department
                )
            };
        case universityConstants.DELETE_DEPARTMENT_SUCCESS:
            // remove deleted department from state
            return {
                departments: state.departments.filter(department => department.Department_Id !== action.Department_Id)
            };
        case universityConstants.DELETE_DEPARTMENT_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to department 
            return {
                ...state,
                departments: state.departments.map(department => {
                    if (department.Department_Id === action.Department_Id) {
                        // make copy of department without 'deleting:true' property
                        const { deleting, ...departmentCopy } = department;
                        // return copy of department with 'deleteError:[error]' property
                        return {...departmentCopy, deleteError: action.error };
                    }

                    return department;
                })
            };
        default:
            return state
    }
}