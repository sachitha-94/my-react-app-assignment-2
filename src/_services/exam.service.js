//import config from 'config';
import { authHeader } from '../_helpers';
import axios from "axios";

export const examService = {
    addExam,
    getAllExams,
};

const config = {
    apiUrl: 'http://localhost:4000'
};

function addExam(exam) {
    var headers = {
        'Content-Type': 'application/json',
        headers: authHeader(),
    };

    var promise = new Promise(function (resolve, reject) {

        axios.post(`${config.apiUrl}/exam/add-exam`, exam, {
            headers: headers
        })
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


function getAllExams() {

    var promise = new Promise(function (resolve, reject) {

        axios.get(`${config.apiUrl}/exam/all-exams`)
            .then(response => {
                if (response.status === 200) {
                    if (response.data.message === "error") {
                        reject(response.data.error);
                    } else {
                        //localStorage.setItem('department', JSON.stringify(response.data.data));
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


