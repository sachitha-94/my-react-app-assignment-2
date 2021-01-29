import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { courseActions } from '../_actions';
import { Table, Button } from 'react-bootstrap';
import { AddModule, UpdateModal } from './';

const Modules = (props) => {

    const { getAllModules, modules } = props;

    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        getAllModules();
    }, [])


    useEffect(() => {
        if (!isAdding || !isUpdating || !isDeleting)
            getAllModules();
    }, [isDeleting, isUpdating, isAdding])



    // const deleteButtonOnClick = (data) => {
    //     setIsDeleting(true);
    //     setSelectedCourse(data)
    // }
    // const handleCloseDeleteModal = () => {

    //     setIsDeleting(false);
    //     setSelectedCourse(null);
    // }
    // const handleDelete = () => {
    //     deleteCourse(selectedCourse?.Course_Id);
    //     handleCloseDeleteModal();
    // }

    // const editButtonOnClick = (data) => {
    //     setIsUpdating(true);
    //     setSelectedCourse(data)
    // }

    // const handleCloseUpdatModal = () => {

    //     setIsUpdating(false);
    //     setSelectedCourse(null);
    // }

    return (
        <div className="row child-component-container">
            <h3 className="child-component-header">Modules</h3>
            <div className="row" style={{
                textAlign: 'right',
                paddingLeft: 30
            }}>
                <Button variant="primary" onClick={() => setIsAdding(true)}>Add Module</Button>{' '}
            </div>
            <div className="row" style={{
                padding: 30
            }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Module Name</th>
                            <th>Course Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {modules?.map((module, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{module.Module_Name}</td>
                                        <td>
                                            {module.Course_Name}
                                        </td>
                                    </tr>
                                );
                            })

                        }

                    </tbody>
                </Table>
            </div>
            {isAdding && <AddModule
                show={isAdding}
                handleClose={() => setIsAdding(false)}
            />}
            {/* {isDeleting && <DeleteModal
                show={isDeleting}
                handleClose={handleCloseDeleteModal}
                handleDelete={handleDelete}
                title='Confirm Delete Course'
                body={`Do you want to Remove ${selectedCourse?.Course_Name} Course?`}
            />}
            {isUpdating && <UpdateModal
                show={isUpdating}
                handleClose={handleCloseUpdatModal}
                selectedCourse={selectedCourse} />} */}
        </div>

    );

}

function mapState(state) {
    return {
        modules: state.coursesReducer.modules,
    };
}

const actionCreators = {
    getAllModules: courseActions.getAllModules,
    editCourse: courseActions.editCourse,
    deleteCourse: courseActions.delete,
};

const connectedModulePage = connect(mapState, actionCreators)(Modules);
export { connectedModulePage as Modules };