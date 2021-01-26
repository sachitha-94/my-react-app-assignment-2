import { studentConstants } from '../_constants';
import { studentService } from '../_services';
import { alertActions } from '.';
import { loaderActions } from '.';

export const studentActions = {
    enroll,
    enrollmentStatus,
    courseStatus,
};

function enroll(enrollmentRequest) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        studentService.enroll(enrollmentRequest)
            .then(
                enrollmentRequest => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(alertActions.success("Enrollment Request Successfully Submitted"));
                    dispatch(success(enrollmentRequest));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };


    function success(enrollmentRequest) { return { type: studentConstants.ENROLL_STUDENT_SUCCESS, enrollmentRequest } }

    function failure(error) { return { type: studentConstants.ENROLL_STUDENT_FAILURE, error } }
}

function enrollmentStatus(studentId) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        studentService.enrollmentStatus(studentId)
            .then(
                enrollmentStatus => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(enrollmentStatus));

                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };


    function success(enrollmentStatus) { return { type: studentConstants.ENROLLMENT_REQUEST_STATUS_SUCCESS, enrollmentStatus } }

    function failure(error) { return { type: studentConstants.ENROLLMENT_REQUEST_STATUS_FAILURE, error } }
}

function courseStatus(studentId) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        studentService.courseStatus()
            .then(
                courseStatus => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(courseStatus));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                }
            );
    };



    function success(courseStatus) { return { type: studentConstants.STUDENT_COURSE_STATUS_SUCCESS, courseStatus } }

    function failure(error) { return { type: studentConstants.STUDENT_COURSE_STATUS_FAILURE, error } }
}