import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { studentActions } from '../_actions';
import { Table } from 'react-bootstrap';

const CourseStatusPage = (props) => {
    const { enrollmentStatus, user, getCourseStatus, courseStatus } = props;

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        enrollmentStatus(user[0]?.User_Id);
        getCourseStatus(user[0]?.User_Id)
    }, []);

    // const enrollRequest = (e, course, studentId) => {
    //     e.preventDefault();
    //     setSubmitted(true);
    //     var enrollRequest = {
    //         Request_Type_Id: 1,
    //         Status_Type_Code_Id: 3,
    //         User_Id: studentId,
    //         Course_id: course.Course_Id,
    //     }
    //     enrollRequest(enrollRequest);
    // }

    return (
        <div className="row child-component-container">
            <h3 className="child-component-header">{courseStatus && courseStatus[0]?.Course_Name} : {courseStatus[0]?.Course_Status}</h3>
            <div className="row" style={{
                padding: 30
            }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th> Course Year</th>
                            <th> Course Year Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseStatus?.map((course, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{course.Course_Year}</td>
                                        <td>{course.Course_Year_Status}</td>
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
        courseStatus: state.studentReducer.courseStatus,
        user: state.authentication.user
    };
}

const actionCreators = {
    enrollmentStatus: studentActions.enrollmentStatus,
    getCourseStatus: studentActions.courseStatus,
};

const connectedCourseStatusPage = connect(mapState, actionCreators)(CourseStatusPage);
export { connectedCourseStatusPage as CourseStatusPage };