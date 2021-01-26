import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { departmentActions } from '../_actions';

class AddDepartment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            department: {
                Department_Name: '',
                Department_Admin_Id: undefined,
            },
            departmentAdmins: [],
            submitted: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getDepartmentAdmins();
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
        const { departmentAdmins } = this.props;
        const { department, submitted } = this.state;
        return (
            <div className="row child-component-container">
                <h3 className="child-component-header">Add Department</h3>
                <div className="col-md-6">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !department.Department_Name ? ' has-error' : '')}>
                            <label htmlFor="Department_Name">Department Name</label>
                            <input type="Department_Name" className="form-control" name="Department_Name" value={department.Department_Name} onChange={this.handleChange} />
                            {submitted && !department.Department_Name &&
                                <div className="help-block">Department Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !department.Department_Admin_Id ? ' has-error' : '')}>
                            <label htmlFor="Department_Admin_Id"></label>
                            <select className="form-control" name="Department_Admin_Id" value={department.Department_Admin_Id} onChange={this.handleChange}>

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
                            {submitted && !department.Department_Admin_Id &&
                                <div className="help-block">Department Admin is required</div>
                            }
                        </div>

                        <div className="form-group">
                            <button className="btn btn-info">Submit</button>
                            {this.props.addEditDepartmentLoading &&
                                <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                            }
                        </div>
                    </form>
                </div>
            </div>

        );
    }
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
    getDepartmentAdmins: departmentActions.getDepartmentAdmins
};

const connectedAddDepartmentPage = connect(mapState, actionCreators)(AddDepartment);
export { connectedAddDepartmentPage as AddDepartment };