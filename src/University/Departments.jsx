import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { departmentActions } from '../_actions';
import { Table, Button } from 'react-bootstrap';

class Departments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            departments: [],

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getAllDepartments();
    }

    handleChange(e) {

        const { name, value } = e.target;
        var department = this.state;
        department[name] = value;
        this.setState({ department });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { department } = this.state;
        if (department.Department_Name && department.Department_Admin_Id) {

            this.props.addDepartment(this.state.department);
        }
    }

    render() {
        return (
            <div className="row child-component-container">
                <h3 className="child-component-header">Departments</h3>
                <div className="row" style={{
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
                            {
                                this.props.departments && this.props.departments.map((dep, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{dep.Department_Name}</td>
                                            <td>{dep.Department_Admin_Id}</td>
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