import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { courseActions, studentActions } from '../_actions';
import { Table, Button } from 'react-bootstrap';

const Enroll = (props) => {

    const { getAllCourses, enrollmentRequest, user, courses } = props;

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        getAllCourses()
    }, [])


    const enrollRequest = (e, course, studentId) => {
        e.preventDefault();
        setSubmitted(true);
        var enrollRequest = {
            Request_Type_Id: 1,
            Status_Type_Code_Id: 3,
            User_Id: studentId,
            Course_Id: course.Course_Id,
        }
        enrollmentRequest(enrollRequest);
    }

    return (
        <div className="row child-component-container">
            <h3 className="child-component-header">Enroll</h3>
            <div className="row" style={{
                padding: 30
            }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Pre Requesites</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses?.map((course, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{course.Course_Name}</td>
                                        <td>{course.Pre_Course_Req}</td>
                                        <td>
                                            <Button onClick={(e) => enrollRequest(e, course, user[0].User_Id)} variant="success">Enroll</Button>
                                        </td>
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
        courses: state.coursesReducer.courses,
    };
}

const actionCreators = {
    getAllCourses: courseActions.getAllCourses,
    enrollmentRequest: studentActions.enroll,
};

const connectedEnrollPage = connect(mapState, actionCreators)(Enroll);
export { connectedEnrollPage as Enroll };