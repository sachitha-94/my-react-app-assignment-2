import React from 'react';
import { connect } from 'react-redux';
import { studentActions } from '../_actions';
import { Table } from 'react-bootstrap';

class CourseStatusPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.handleChange = this.enrollRequest.bind(this);
    }

    componentDidMount() {
        const user = this.props.user;
        this.props.enrollmentStatus(user[0].User_Id);
    }


    enrollRequest(e, course, studentId) {
        e.preventDefault();
        this.setState({ submitted: true });
        var enrollRequest = {
            Request_Type_Id: 1,
            Status_Type_Code_Id: 2,
            User_Id: studentId,
            Course_id: course.Course_Id,
        }
        this.props.enrollRequest(enrollRequest);
    }

    render() {
        return (
            <div className="row child-component-container">
                <h3 className="child-component-header">{this.props.courseStatus[0].Course_Name} : {this.props.courseStatus[0].Course_Status}</h3>
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
                            {
                                this.props.courseStatus && this.props.courseStatus.map((course, index) => {
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
}

function mapState(state) {
    return {
        courseStatus: state.studentReducer.courseStatus,
    };
}

const actionCreators = {
    enrollmentStatus: studentActions.enrollmentStatus,
    courseStatus: studentActions.courseStatus,
};

const connectedCourseStatusPage = connect(mapState, actionCreators)(CourseStatusPage);
export { connectedCourseStatusPage as CourseStatusPage };