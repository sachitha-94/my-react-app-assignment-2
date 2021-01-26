import React from 'react';
import { connect } from 'react-redux';
import { courseActions, studentActions } from '../_actions';
import { Table, Button } from 'react-bootstrap';

class Enroll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.enrollRequest.bind(this);
    }

    componentDidMount() {
        this.props.getAllCourses();
    }


    enrollRequest(e, course, studentId) {
        e.preventDefault();
        this.setState({ submitted: true });
        var enrollRequest = {
            Request_Type_Id: 1,
            Status_Type_Code_Id: 3,
            User_Id: studentId,
            Course_Id: course.Course_Id,
        }
        this.props.enrollmentRequest(enrollRequest);
    }

    render() {
        const { user } = this.props;
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
                            {
                                this.props.courses && this.props.courses.map((course, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{course.Course_Name}</td>
                                            <td>{course.Pre_Course_Req}</td>
                                            <td>
                                                <Button onClick={(e) => this.enrollRequest(e, course, user[0].User_Id)} variant="success">Enroll</Button>
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