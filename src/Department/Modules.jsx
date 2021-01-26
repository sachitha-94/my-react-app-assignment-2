import React from 'react';
import { connect } from 'react-redux';
import { courseActions } from '../_actions';
import { Table, Button } from 'react-bootstrap';

class Modules extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            modules: [],

        };

    }

    componentDidMount() {
        this.props.getAllModules();
    }





    render() {
        return (
            <div className="row child-component-container">
                <h3 className="child-component-header">Modules</h3>
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
                            {
                                this.props.modules && this.props.modules.map((module, index) => {
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
            </div>

        );
    }
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