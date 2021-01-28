import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { departmentActions } from '../_actions';
import { DeleteModal } from '../Common/DeleteModal';
import { AddDepartmentModal, UpdateModal } from './';

const Departments = (props) => {
    const { getAllDepartments, departments, deleteDepartment } = props

    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        getAllDepartments();
    }, [])

    useEffect(() => {
        if (!isAdding || !isUpdating || !isDeleting)
            getAllDepartments();
    }, [isDeleting, isUpdating, isAdding])



    const deleteButtonOnClick = (data) => {
        setIsDeleting(true);
        setSelectedDepartment(data)
    }
    const handleCloseDeleteModal = () => {

        setIsDeleting(false);
        setSelectedDepartment(null);
    }
    const handleDeleteDepartment = () => {
        deleteDepartment(selectedDepartment?.Department_Id);
        handleCloseDeleteModal();
    }

    const editButtonOnClick = (data) => {
        setIsUpdating(true);
        setSelectedDepartment(data)
    }

    const handleCloseUpdatModal = () => {

        setIsUpdating(false);
        setSelectedDepartment(null);
    }
    return (
        <>
        <div className="row child-component-container">
            <h3 className="child-component-header">Departments</h3>
                <div className="row" style={{
                    textAlign: 'right',
                    paddingLeft: 45
                }}>
                    <Button variant="primary" onClick={() => setIsAdding(true)}>Add Department</Button>{' '}
                </div>
                <div style={{
                padding: 30
            }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Department Name</th>
                            <th>Admin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                            {departments?.map((dep, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{dep.Department_Name}</td>
                                        <td>{`${dep.Department_Admin_Id} - ${dep?.First_Name} ${dep?.Last_Name} `}</td>
                                        <td>
                                            <Button variant="success" onClick={() => editButtonOnClick(dep)}>Edit</Button>{' '}
                                            <Button variant="danger" onClick={() => deleteButtonOnClick(dep)}>Delete</Button>
                                        </td>
                                    </tr>
                                );
                            })

                        }

                    </tbody>
                </Table>
            </div>
                {isAdding && <AddDepartmentModal
                    show={isAdding}
                    handleClose={() => setIsAdding(false)}
                />}
                {isDeleting && <DeleteModal
                    show={isDeleting}
                    handleClose={handleCloseDeleteModal}
                    handleDelete={handleDeleteDepartment}
                    title='Confirm Delete Department'
                    body={`Do you want to Remove ${selectedDepartment?.Department_Name} department?`}
                />}
                {isUpdating && <UpdateModal
                    show={isUpdating}
                    handleClose={handleCloseUpdatModal}
                    selectedDepartment={selectedDepartment} />}
        </div>
        </>
    );

}

function mapState(state) {
    return {
        departments: state.departmentsReducer.departments,
    };
}

const actionCreators = {
    getAllDepartments: departmentActions.getAllDepartments,
    editDepartment: departmentActions.editDepartment,
    deleteDepartment: departmentActions.delete,
};

const connectedDepartmentPage = connect(mapState, actionCreators)(Departments);
export { connectedDepartmentPage as Departments };