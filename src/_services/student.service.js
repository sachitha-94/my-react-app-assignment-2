//import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";

export const studentService = {
    enroll,
    enrollmentStatus,
    courseStatus
};

const config = {
    apiUrl: 'http://localhost:4000'
};

function enroll(enrollmentRequest) {
    var headers = {
        'Content-Type': 'application/json',
        headers: authHeader(),
    };

    var promise = new Promise(function(resolve, reject) {

        axios.post(`${config.apiUrl}/student/enroll`, enrollmentRequest, {
                headers: headers
            })
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}

function enrollmentStatus(studentId) {

    var promise = new Promise(function(resolve, reject) {

        axios.get(`${config.apiUrl}/student/enrollment-status/${studentId}`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        resolve(response.data.data);

                    }
                } else if (response.status === 400) {

                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}

function courseStatus(studentId) {

    var promise = new Promise(function(resolve, reject) {

        axios.get(`${config.apiUrl}/student/course-status/${studentId}`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('department', JSON.stringify(response.data.data));
                        resolve(response.data.data);

                    }
                } else {
                    reject("Api response failed !");
                }
            })
            .catch(err => {
                return ("Api response failed !");
            });

    });

    return promise;
}