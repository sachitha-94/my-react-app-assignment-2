import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { courseActions } from '../_actions';
import { Table, Button } from 'react-bootstrap';
import { AddCourseModal, UpdateModal } from './';
import { DeleteModal } from '../Common/DeleteModal';

const Courses = (props) => {

    const { getAllCourses, courses, deleteCourse } = props


    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        getAllCourses();
    }, [])


    useEffect(() => {
        if (!isAdding || !isUpdating || !isDeleting)
            getAllCourses();
    }, [isDeleting, isUpdating, isAdding])



    const deleteButtonOnClick = (data) => {
        setIsDeleting(true);
        setSelectedCourse(data)
    }
    const handleCloseDeleteModal = () => {

        setIsDeleting(false);
        setSelectedCourse(null);
    }
    const handleDelete = () => {
        deleteCourse(selectedCourse?.Course_Id);
        handleCloseDeleteModal();
    }

    const editButtonOnClick = (data) => {
        setIsUpdating(true);
        setSelectedCourse(data)
    }

    const handleCloseUpdatModal = () => {

        setIsUpdating(false);
        setSelectedCourse(null);
    }

    return (
        <div className="row child-component-container">
            <h3 className="child-component-header">Courses</h3>
            <div className="row" style={{
                textAlign: 'right',
                paddingLeft: 30
            }}>
                <Button variant="primary" onClick={() => setIsAdding(true)}>Add Course</Button>{' '}
            </div>
            <div className="row" style={{
                padding: 30
            }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Department</th>
                            <th>Type</th>
                            <th>Pre Requesites</th> 
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses?.map((course, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{course.Course_Name}</td>
                                        <td>{course.Department_Id || ''}</td>
                                        <td>{course.Course_Type}</td>
                                        <td>{course.Pre_Course_Req}</td>
                                        <td>
                                            <Button variant="success" onClick={() => editButtonOnClick(course)}>Edit</Button>{' '}
                                            <Button variant="danger" onClick={() => deleteButtonOnClick(course)}>Delete</Button>
                                        </td>
                                    </tr>
                                );
                            })

                        }

                    </tbody>
                </Table>
            </div>
            {isAdding && <AddCourseModal
                show={isAdding}
                handleClose={() => setIsAdding(false)}
            />}
            {isDeleting && <DeleteModal
                show={isDeleting}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDelete}
                title='Confirm Delete Course'
                body={`Do you want to Remove ${selectedCourse?.Course_Name} Course?`}
            />}
            {isUpdating && <UpdateModal
                show={isUpdating}
                handleClose={handleCloseUpdatModal}
                selectedCourse={selectedCourse} />}
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
    editCourse: courseActions.editCourse,
    deleteCourse: courseActions.delete,
};

const connectedCoursePage = connect(mapState, actionCreators)(Courses);
export { connectedCoursePage as Courses };