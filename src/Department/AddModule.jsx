import React from 'react';
import { connect } from 'react-redux';
import { courseActions, userActions } from '../_actions';
import { CourseYearTypeCodes } from '../_constants';
class AddModule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            module: {
                Module_Id: 0,
                Course_Id: 0,
                Module_Name: '',
                Teacher_Id: 0,
                Course_Year_Id: 0,
            },
            submitted: false,
            isPostGraduate: true,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getAllUsersByRole(4);
        this.props.getAllCourses();
    }

    handleChange(e) {

        const { name, value } = e.target;
        if (name === "Course_Id") {
            this.props.courses.forEach(course => {
                if (course.Course_Id == value) {
                    if (course.Course_Type_Code_Id !== 2) {
                        this.setState({ isPostGraduate: false });
                    }
                    else {
                        this.setState({ isPostGraduate: true });
                    }
                }
            });

        }
        var { module } = this.state;
        module[name] = value;
        this.setState({ module });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });

        const { module } = this.state;
        if (module.Module_Name && module.Course_Id && module.Teacher_Id && module.Course_Year_Id) {

            this.props.addModule(module);
        }
    }

    render() {
        const { module, submitted } = this.state;
        const { courses, tutors } = this.props;
        return (
            <div className="row child-component-container">
                <h3 className="child-component-header">Add Module</h3>
                <div className="col-md-6">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !module.Module_Name ? ' has-error' : '')}>
                            <label htmlFor="Module_Name">Module Name</label>
                            <input type="text" className="form-control" name="Module_Name" value={this.state.module.Module_Name} onChange={this.handleChange} />
                            {submitted && !module.Module_Name &&
                                <div className="help-block">Module Name is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !module.Course_Id ? ' has-error' : '')}>
                            <label htmlFor="Course_Id">Course</label>
                            <select className="form-control" name="Course_Id" value={this.state.module.Course_Id} onChange={this.handleChange}>

                                <option value="0">
                                    Select
                             </option>


                                {
                                    courses && courses.map((option, index) => {

                                        return (

                                            <option value={option.Course_Id} key={index}>
                                                {option.Course_Name}
                                            </option>

                                        )
                                    })

                                }
                            </select>
                            {submitted && !module.Course_Id &&
                                <div className="help-block">Course is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !module.Teacher_Id ? ' has-error' : '')}>
                            <label htmlFor="Teacher_Id">Tutor</label>
                            <select className="form-control" name="Teacher_Id" value={this.state.module.Teacher_Id} onChange={this.handleChange}>

                                <option value="0">
                                    Select
                             </option>


                                {
                                    tutors && tutors.map((option, index) => {

                                        return (

                                            <option value={option.User_Id} key={index}>
                                                {option.First_Name} {option.Last_Name}
                                            </option>

                                        )
                                    })

                                }
                            </select>
                            {submitted && !module.Teacher_Id &&
                                <div className="help-block">Tutor is required</div>
                            }
                        </div>
                        <div className={'form-group' + (submitted && !module.Course_Year_Id ? ' has-error' : '')}>
                            <label htmlFor="Course_Year_Id">Course Year</label>
                            <select className="form-control" name="Course_Year_Id" value={this.state.module.Course_Year_Id} onChange={this.handleChange}>

                                <option value="0">
                                    Select
                             </option>


                                {
                                    CourseYearTypeCodes && CourseYearTypeCodes.filter(x => ((this.state.isPostGraduate && (x.id == 1)) || !this.state.isPostGraduate)).map((option, index) => {

                                        return (

                                            <option value={option.id} key={index}>
                                                {option.value}
                                            </option>

                                        )
                                    })

                                }
                            </select>
                            {submitted && !module.Course_Year_Id &&
                                <div className="help-block">Course Year is required</div>
                            }
                        </div>

                        <div className="form-group">
                            <button className="btn btn-info">Submit</button>
                        </div>
                    </form>
                </div>
            </div>

        );
    }
}

function mapState(state) {
    return {
        courses: state.coursesReducer.courses,
        tutors: state.users.items,
    };
}

const actionCreators = {
    addModule: courseActions.addModule,
    getAllCourses: courseActions.getAllCourses,
    getAllUsersByRole: userActions.getAll
};

const connectedAddModulePage = connect(mapState, actionCreators)(AddModule);
export { connectedAddModulePage as AddModule };