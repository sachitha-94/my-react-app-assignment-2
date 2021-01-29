import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { studentActions } from '../_actions';
import { Table } from 'react-bootstrap';

const StudentEnrollmentStatus = (props) => {

    const { user, enrollmentStatus, getEnrollmentStatus, enrollmentRequestStatus, getCourseStatus, courseStatus } = props;

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getEnrollmentStatus(user[0].User_Id);
    }, [])



    // const handleEnrollRequest = (e, course, studentId) => {
    //     e.preventDefault();
    //     setSubmitted(true);
    //     var enrollRequest = {
    //         Request_Type_Id: 1,
    //         Status_Type_Code_Id: 2,
    //         User_Id: studentId,
    //         Course_id: course.Course_Id,
    //     }
    //     enrollRequest(enrollRequest);
    // }s
    console.log('courseStatus', courseStatus);
    console.log('enrollmentRequestStatus', enrollmentRequestStatus);
    return (
        <div className="row child-component-container">
            <h3 className="child-component-header">Enroll modules</h3>
            <div className="row" style={{
                padding: 30
            }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Enrollment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollmentRequestStatus?.map((enrollment, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{enrollment.Course_Name}</td>
                                        <td>{enrollment.Status_Name}</td>
                                    </tr>
                                );
                            })

                        }

                    </tbody>
                </Table>
            </div>
        </div>

    );
}

function mapState(state) {
    return {
        enrollmentRequestStatus: state.studentReducer.enrollmentRequestStatus,
        courseStatus: state.courseStatus,
        user: state.authentication.user
    };
}

const actionCreators = {
    getEnrollmentStatus: studentActions.enrollmentStatus,
    getCourseStatus: studentActions.courseStatus,
};


const connectedEnrollPage = connect(mapState, actionCreators)(StudentEnrollmentStatus);
export { connectedEnrollPage as StudentEnrollmentStatus };