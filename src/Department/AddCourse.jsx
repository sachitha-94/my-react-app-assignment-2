import React from 'react';
import { connect } from 'react-redux';
import { courseActions } from '../_actions';
import { CourseTypeCodes } from '../_constants';
class AddCourse extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            course: {
                Course_Id: 0,
                Course_Name: '',
                Pre_Course_Req: '',
            },
            courses: [],
            submitted: false,

        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    handleChange(e) {

        const { name, value } = e.target;
        var { course } = this.state;
        course[name] = value;
        this.setState({ course });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { course } = this.state;
        if (course.Course_Name && course.Course_Type_Code_Id) {

            this.props.addCourse(this.state.course);
        }
    }

    render() {
        const { course, submitted } = this.state;
        return (
            <div className="row child-component-container">
                <h3 className="child-component-header">Add Course</h3>
                <div className="col-md-6">
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group' + (submitted && !course.Course_Name ? ' has-error' : '')}>
                            <label htmlFor="Course_Name">Course Name</label>
                            <input type="text" className="form-control" name="Course_Name" value={course.Course_Name} onChange={this.handleChange} />
                            {submitted && !course.Course_Name &&
                                <div className="help-block">Course Name is required</div>
                            }
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="Pre_Course_Req">Course Pre Requesites</label>
                            <input type="textarea" className="form-control" name="Pre_Course_Req" value={course.Pre_Course_Req} onChange={this.handleChange} />
                        </div>

                        <div className={'form-group' + (submitted && !course.Course_Type_Code_Id ? ' has-error' : '')}>
                            <label htmlFor="Course_Type_Code_Id">Course Type</label>
                            <select className="form-control" name="Course_Type_Code_Id" value={course.Course_Type_Code_Id} onChange={this.handleChange}>

                                <option value="0">
                                    Select
                             </option>


                                {
                                    CourseTypeCodes && CourseTypeCodes.map((option, index) => {

                                        return (

                                            <option value={option.id} key={index}>
                                                {option.value}
                                            </option>

                                        )
                                    })

                                }
                            </select>
                            {submitted && !course.Course_Type_Code_Id &&
                                <div className="help-block">Course Type is required</div>
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
        course: state.coursesReducer.course,
    };
}

const actionCreators = {
    addCourse: courseActions.addCourse,
};

const connectedAddCoursePage = connect(mapState, actionCreators)(AddCourse);
export { connectedAddCoursePage as AddCourse };