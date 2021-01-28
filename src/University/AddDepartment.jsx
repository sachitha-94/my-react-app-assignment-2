import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from "react-bootstrap";
import { connect } from 'react-redux';
import { departmentActions } from '../_actions';

const AddDepartment = (props) => {

    const [Department_Name, setDepartment_Name] = useState('');
    const [Department_Admin_Id, setDepartment_Admin_Id] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const {
        show,
        handleClose,
        departmentAdmins,
        addDepartment,
        getDepartmentAdmins,
        addEditDepartmentLoading,
    } = props;

    useEffect(() => {
        getDepartmentAdmins();
    }, [])



    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === 'Department_Name') setDepartment_Name(value);
        else if (name === 'Department_Admin_Id') setDepartment_Admin_Id(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);
    
        if (Department_Name && Department_Admin_Id) {
            const data = {
                Department_Name,
                Department_Admin_Id
            }
            await addDepartment(data);
            setDepartment_Name('');
            setDepartment_Admin_Id('');
            setSubmitted(false);
            handleClose()
        }
    }

    return (

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !Department_Name ? ' has-error' : '')}>
                        <label htmlFor="Department_Name">Department Name</label>
                        <input type="Department_Name" className="form-control" name="Department_Name" value={Department_Name} onChange={handleChange} />
                        {submitted && !Department_Name &&
                            <div className="help-block">Department Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Department_Admin_Id ? ' has-error' : '')}>
                        <label htmlFor="Department_Admin_Id"></label>
                        <select className="form-control" name="Department_Admin_Id" value={Department_Admin_Id} onChange={handleChange}>

                            <option value="0">
                                Select Admin
                            </option>


                            {
                                departmentAdmins && departmentAdmins.map((option, index) => {

                                    return (

                                        <option value={option.User_Id} key={index}>
                                            {option.User_Name}
                                        </option>

                                    )
                                })

                            }
                        </select>
                        {submitted && !Department_Admin_Id &&
                            <div className="help-block">Department Admin is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-info">Submit</button>
                        {addEditDepartmentLoading &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                </form>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
          </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Save
          </Button>
            </Modal.Footer> */}
        </Modal>
    );
}

function mapState(state) {
    return {
        addEditDepartmentLoading: state.departmentsReducer.loading ? true : false,
        department: state.departmentsReducer.departments,
        departmentAdmins: state.departmentsReducer.departmentAdmins,
    };
}

const actionCreators = {
    addDepartment: departmentActions.addDepartment,
    editDepartment: departmentActions.editDepartment,
    getDepartmentAdmins: departmentActions.getDepartmentAdmins,
    getAllDepartments: departmentActions.getAllDepartments,
};

const connectedAddDepartmentPage = connect(mapState, actionCreators)(AddDepartment);
export { connectedAddDepartmentPage as AddDepartmentModal };