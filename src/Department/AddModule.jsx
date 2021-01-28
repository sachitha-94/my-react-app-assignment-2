import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from "react-bootstrap";
import { courseActions, userActions } from '../_actions';
import { CourseYearTypeCodes } from '../_constants';

const AddModule = (props) => {

    const {
        getAllUsersByRole,
        getAllCourses,
        courses,
        addModule,
        tutors,
        show,
        handleClose
    } = props;

    const [Course_Id, setCourse_Id] = useState('');
    const [Module_Name, setModule_Name] = useState('');
    const [Teacher_Id, setTeacher_Id] = useState('');
    const [Course_Year_Id, setCourse_Year_Id] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [isPostGraduate, setisPostGraduate] = useState(false);

    useEffect(() => {
        getAllUsersByRole();
        getAllCourses();
    }, [])

    const handleChange = (e) => {

        const { name, value } = e.target;
        if (name === "Course_Id") {
            courses.forEach(course => {
                if (course.Course_Id == value) {
                    if (course.Course_Type_Code_Id !== 2) {
                        setisPostGraduate(false);
                    }
                    else {
                        setisPostGraduate(true);
                    }
                }
            });
            setCourse_Id(value);
        } else if (name === 'Module_Name') setModule_Name(value);
        else if (name === 'Teacher_Id') setTeacher_Id(value);
        else if (name === 'Course_Year_Id') setCourse_Year_Id(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (Module_Name && Course_Id && Teacher_Id && Course_Year_Id) {
            const data = {
                Module_Name,
                Course_Id,
                Teacher_Id,
                Course_Year_Id
            }
            await addModule(data);
            handleClose();
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Department</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form name="form" onSubmit={handleSubmit}>
                    <div className={'form-group' + (submitted && !Module_Name ? ' has-error' : '')}>
                        <label htmlFor="Module_Name">Module Name</label>
                        <input type="text" className="form-control" name="Module_Name" value={Module_Name} onChange={handleChange} />
                        {submitted && !Module_Name &&
                            <div className="help-block">Module Name is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Course_Id ? ' has-error' : '')}>
                        <label htmlFor="Course_Id">Course</label>
                        <select className="form-control" name="Course_Id" value={Course_Id} onChange={handleChange}>

                            <option value="0">
                                Select
                            </option>


                            {courses?.map((option, index) => {

                                    return (

                                        <option value={option.Course_Id} key={index}>
                                            {option.Course_Name}
                                        </option>

                                    )
                                })

                            }
                        </select>
                        {submitted && !Course_Id &&
                            <div className="help-block">Course is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Teacher_Id ? ' has-error' : '')}>
                        <label htmlFor="Teacher_Id">Tutor</label>
                        <select className="form-control" name="Teacher_Id" value={Teacher_Id} onChange={handleChange}>

                            <option value="0">
                                Select
                            </option>


                            {tutors?.map((option, index) => {

                                    return (

                                        <option value={option.User_Id} key={index}>
                                            {option.First_Name} {option.Last_Name}
                                        </option>

                                    )
                                })

                            }
                        </select>
                        {submitted && !Teacher_Id &&
                            <div className="help-block">Tutor is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !Course_Year_Id ? ' has-error' : '')}>
                        <label htmlFor="Course_Year_Id">Course Year</label>
                        <select className="form-control" name="Course_Year_Id" value={Course_Year_Id} onChange={handleChange}>

                            <option value="0">
                                Select
                            </option>


                            {CourseYearTypeCodes?.filter(x => ((isPostGraduate && (x.id === 1)) || !isPostGraduate)).map((option, index) => {

                                    return (

                                        <option value={option.id} key={index}>
                                            {option.value}
                                        </option>

                                    )
                                })

                            }
                        </select>
                        {submitted && !Course_Year_Id &&
                            <div className="help-block">Course Year is required</div>
                        }
                    </div>

                    <div className="form-group">
                        <button className="btn btn-info">Submit</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );

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