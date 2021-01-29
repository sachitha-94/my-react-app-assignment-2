import { universityConstants } from '../_constants';
import { departmentService } from '../_services';
import { alertActions } from '.';
import { loaderActions } from '.';

export const departmentActions = {
    addDepartment,
    editDepartment,
    getAllDepartments,
    getDepartmentAdmins,
    delete: _delete
};

function addDepartment(department) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        departmentService.addDepartment(department)
            .then(
                department => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(alertActions.success("Successfully Added Department"));
                    dispatch(success(department));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(department) { return { type: universityConstants.ADD_DEPARTMENT_REQUEST, department } }

    function success(department) { return { type: universityConstants.ADD_DEPARTMENT_SUCCESS, department } }

    function failure(error) { return { type: universityConstants.ADD_DEPARTMENT_FAILURE, error } }
}

function editDepartment(department) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        departmentService.editDepartment(department)
            .then(
                department => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(alertActions.success('successfully updated'));
                    dispatch(success());

                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(department) { return { type: universityConstants.EDIT_DEPARTMENT_REQUEST, department } }

    function success(department) { return { type: universityConstants.EDIT_DEPARTMENT_SUCCESS, department } }

    function failure(error) { return { type: universityConstants.EDIT_DEPARTMENT_FAILURE, error } }
}

function getDepartmentAdmins() {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        departmentService.getDepartmentAdmins()
            .then(
                departmentAdmins => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(departmentAdmins));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: universityConstants.GETALL_DEPARTMENTS_ADMINS_REQUEST } }

    function success(departmentAdmins) { return { type: universityConstants.GETALL_DEPARTMENTS_ADMINS_SUCCESS, departmentAdmins } }

    function failure(error) { return { type: universityConstants.GETALL_DEPARTMENTS_ADMINS_FAILURE, error } }
}

function getAllDepartments() {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        departmentService.getAllDepartments()
            .then(
                departments => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(departments));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: universityConstants.GETALL_DEPARTMENTS_REQUEST } }

    function success(departments) { return { type: universityConstants.GETALL_DEPARTMENTS_SUCCESS, departments } }

    function failure(error) { return { type: universityConstants.GETALL_DEPARTMENTS_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(Department_Id) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        dispatch(request(Department_Id));

        departmentService.delete(Department_Id)
            .then(
                department => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(Department_Id))
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(Department_Id, error.toString()))
                }
            );
    };

    function request(Department_Id) { return { type: universityConstants.DELETE_DEPARTMENT_REQUEST, Department_Id } }

    function success(Department_Id) { return { type: universityConstants.DELETE_DEPARTMENT_SUCCESS, Department_Id } }

    function failure(Department_Id, error) { return { type: universityConstants.DELETE_DEPARTMENT_FAILURE, Department_Id, error } }
}