import { examConstants } from '../_constants';
import { examService } from '../_services';
import { alertActions } from '.';
import { loaderActions } from '.';

export const examActions = {
    addExam,
    getAllExams,
};

function addExam(data) {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());

        examService.addExam(data)
            .then(
                exam => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(alertActions.success("Successfully Added Exam"));
                    dispatch(success(exam));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(exam) { return { type: examConstants.ADD_EXAMREQUEST, exam } }

    function success(exam) { return { type: examConstants.ADD_EXAMSUCCESS, exam } }

    function failure(error) { return { type: examConstants.ADD_EXAMFAILURE, error } }
}

function getAllExams() {
    return dispatch => {
        dispatch(loaderActions.LoadingStart());
        examService.getAllExams()
            .then(
                exams => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(success(exams));
                },
                error => {
                    dispatch(loaderActions.LoadingEnd());
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() { return { type: examConstants.GETALL_EXAM_REQUEST } }

    function success(exams) { return { type: examConstants.GETALL_EXAM_SUCCESS, exams } }

    function failure(error) { return { type: examConstants.GETALL_EXAM_FAILURE, error } }
}
