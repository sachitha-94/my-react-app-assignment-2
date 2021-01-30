import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { examActions } from '../_actions';
import { AddExamModal, } from '.';

const EexamsList = (props) => {
    const { getAllExamsRequest, exams, user } = props

    const [isAdding, setIsAdding] = useState(false);
    // const [selectedDepartment, setSelectedDepartment] = useState(null);

    useEffect(() => {
        getAllExamsRequest();
    }, [])

    useEffect(() => {
        if (!isAdding)
            getAllExamsRequest();
    }, [isAdding])



    // const deleteButtonOnClick = (data) => {
    //     setIsDeleting(true);
    //     setSelectedDepartment(data)
    // }
    // const handleCloseDeleteModal = () => {

    //     setIsDeleting(false);
    //     setSelectedDepartment(null);
    // }
    // const handleDeleteDepartment = () => {
    //     deleteDepartment(selectedDepartment?.Department_Id);
    //     handleCloseDeleteModal();
    // }

    // const editButtonOnClick = (data) => {
    //     setIsUpdating(true);
    //     setSelectedDepartment(data)
    // }

    // const handleCloseUpdatModal = () => {

    //     setIsUpdating(false);
    //     setSelectedDepartment(null);
    // }
    return (
        <>
            <div className="row child-component-container">
                <h3 className="child-component-header">Exams</h3>
                {user[0]?.Role_Type_Code_Id !== 3 && <div className="row" style={{
                    textAlign: 'right',
                    paddingLeft: 45
                }}>
                    <Button variant="primary" onClick={() => setIsAdding(true)}>Add Exam</Button>{' '}
                </div>}
                <div style={{
                    padding: 30
                }}>
                    <Table striped bordered hover size="sm">
                        <thead>
                            <tr>
                                <th>Exam Name</th>
                                <th>Exam ID</th>
                                <th>Module</th>
                                <th>Exam Type</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {exams?.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.Exam_Name}</td>
                                        <td>{item.Exam_Id}</td>
                                        <td>{item.Module_Name}</td>
                                        <td>{item.Exam_Type_Name}</td>
                                        <td>{item.Date}</td>

                                    </tr>
                                );
                            })

                            }

                        </tbody>
                    </Table>
                </div>
                {isAdding && <AddExamModal
                    show={isAdding}
                    handleClose={() => setIsAdding(false)}
                />}

            </div>
        </>
    );

}

function mapState(state) {
    return {
        exams: state.examReducer.exams,
        user: state.authentication.user
    };
}

const actionCreators = {
    getAllExamsRequest: examActions.getAllExams,
};

const connectedExams = connect(mapState, actionCreators)(EexamsList);
export { connectedExams as Exams };