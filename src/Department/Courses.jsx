import React from 'react';
import { connect } from 'react-redux';
import { courseActions } from '../_actions';
import { Table, Button } from 'react-bootstrap';

class Courses extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            courses: [],

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getAllCourses();
    }

    handleChange(e) {

        const { name, value } = e.target;
        var course = this.state;
        course[name] = value;
        this.setState({ course });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { course } = this.state;
        if (course.Course_Name && course.Course_Admin_Id) {

            this.props.addCourse(this.state.course);
        }
    }

    render() {
        return (
            <div className="row child-component-container">
                <h3 className="child-component-header">Courses</h3>
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
                                                <Button variant="success">Edit</Button>{' '}
                                                <Button variant="danger">Delete</Button>
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
    editCourse: courseActions.editCourse,
    deleteCourse: courseActions.delete,
};

const connectedCoursePage = connect(mapState, actionCreators)(Courses);
export { connectedCoursePage as Courses };